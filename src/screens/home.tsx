import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Alert, StyleSheet, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ScreenWrapper from '../components/ScreenWrapper';
import Icon from '../assets/icons';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../components/Button';
import Input from '../components/Input';

// Define the structure for each task
interface Task {
  id: string;
  title: string;
  description: string;
  deadline: number;
  completed: boolean;
  priority: string;
  uid: string;
}

const Home: React.FC = () => {
  // States to store user inputs and task data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priority, setPriority] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  // Dropdown options for task priority
  const data = [
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  ];

  // Fetch tasks from Firestore for the current user
  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('tasks')
      .where('uid', '==', user.uid) // Only fetch tasks for the current user
      .onSnapshot(snapshot => {
        const fetchedTasks: Task[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, 'id'>),
        }));
        setTasks(fetchedTasks); // Update tasks in the state
      });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Function to add a new task
  const addTask = async () => {
    const user = auth().currentUser;

    // Check if all fields are filled
    if (!title || !deadline || !priority || !user) {
      return Alert.alert('Please fill all fields');
    }

    // Convert deadline to timestamp
    const deadlineDate = new Date(deadline);
    const timestamp = deadlineDate.getTime();

    const newTask = {
      title,
      description,
      deadline: timestamp, // Store deadline as timestamp
      uid: user.uid, // Store current user's ID
      completed: false,
      priority,
    };

    // Add the new task to Firestore
    await firestore().collection('tasks').add(newTask);

    // Clear the input fields after adding a task
    setTitle('');
    setDescription('');
    setDeadline('');
    setPriority(null);
  };

  // Toggle the completion status of a task
  const toggleComplete = async (id: string, completed: boolean) => {
    await firestore()
      .collection('tasks')
      .doc(id)
      .update({completed: !completed}); // Flip the completion status
  };

  // Delete a task after confirmation
  const deleteTask = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('tasks').doc(id).delete(); // Delete task from Firestore
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  // Handle user logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await auth().signOut(); // Sign out the user
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  // Format the timestamp into a readable date and time format (with AM/PM)
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const dd = String(date.getDate()).padStart(2, '0'); // Day (with leading zero)
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month (with leading zero)
    const yyyy = date.getFullYear(); // Year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes (with leading zero)
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    hours = hours % 12; // Convert 24-hour format to 12-hour format
    hours = hours ? hours : 12; // If the hour is 0, display as 12
    return `${dd}/${mm}/${yyyy} ${hours}:${minutes} ${ampm}`; // Return formatted string
  };

  return (
    <ScreenWrapper bg="white">
      {/* Header section with icons and title */}
      <View style={styles.header}>
        <Pressable onPress={handleLogout} style={styles.headerIcon}>
          <Icon name="logout" size={20} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Tasks</Text>
        <Pressable
          style={[
            styles.headerIcon,
            {backgroundColor: theme.colors.primaryDark},
          ]}>
          <Icon name="user" size={20} color="white" />
        </Pressable>
      </View>

      {/* Main content section */}
      <View style={styles.container}>
        {/* Input fields for task title, description, deadline, and priority */}
        <View style={{gap: hp(1.2)}}>
          <Input
            icon={<Icon name="edit" size={26} strokeWidth={1.6} />}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            icon={<Icon name="comment" size={26} strokeWidth={1.6} />}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <Input
            icon={<Icon name="plus" size={26} strokeWidth={1.6} />}
            placeholder="Deadline (YYYY-MM-DD HH:MM)"
            value={deadline}
            onChangeText={setDeadline}
          />

          {/* Dropdown for priority */}
          <Dropdown
            style={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            activeColor={theme.colors.primary}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select priority' : '...'}
            value={priority}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setPriority(item.value); // Update selected priority
              setIsFocus(false);
            }}
          />

          {/* Button to add the task */}
          <Button title="Add Task" onPress={addTask} />
        </View>

        {/* List of tasks */}
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{marginTop: hp(3)}}
          renderItem={({item}) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDescription}>
                Priority: {item.priority}
              </Text>
              <Text style={styles.taskDeadline}>
                Due: {formatDateTime(item.deadline)}{' '}
                {/* Display formatted deadline */}
              </Text>
              <View style={styles.taskActions}>
                {/* Button to toggle task completion */}
                <Pressable
                  onPress={() => toggleComplete(item.id, item.completed)}
                  style={[
                    styles.completeButton,
                    {
                      backgroundColor: item.completed
                        ? theme.colors.rose
                        : theme.colors.primary,
                    },
                  ]}>
                  <Text style={styles.completeButtonText}>
                    {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </Text>
                </Pressable>

                {/* Button to delete a task */}
                <Pressable
                  style={styles.closeIcon}
                  onPress={() => deleteTask(item.id)}>
                  <Icon name="delete" size={22} color="white" />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  // Styles for header, buttons, inputs, etc.
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4.5),
    marginTop: hp(1),
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  headerIcon: {
    backgroundColor: 'red',
    padding: wp(3),
    borderRadius: theme.radius.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: hp(2),
    marginVertical: hp(2),
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: wp(3),
    marginBottom: hp(1.5),
    borderRadius: theme.radius.md,
  },
  taskCard: {
    backgroundColor: '#f2f2f2',
    padding: hp(2),
    borderRadius: theme.radius.sm,
    marginBottom: hp(2),
  },
  taskTitle: {
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
  },
  taskDescription: {
    fontSize: hp(1.6),
    marginVertical: hp(0.5),
  },
  taskDeadline: {
    fontSize: hp(1.5),
    color: theme.colors.textLight,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
  },
  closeIcon: {
    position: 'absolute',
    top: hp(0.2),
    right: wp(2),
    padding: wp(1.8),
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(255,0,0,0.8)',
    marginBottom: hp(3),
  },
  completeButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: hp(1.7),
    fontWeight: theme.fonts.semibold,
  },
  dropdownContainer: {
    padding: wp(3.5),
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: theme.radius.xxl,
    marginBottom: hp(1.5),
  },
  placeholderStyle: {
    fontSize: hp(1.6),
    color: theme.colors.text,
  },
  selectedTextStyle: {
    fontSize: hp(1.6),
    color: theme.colors.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Home;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderDropdown = () => {
    const posts = [...new Set(comments.map(comment => comment.postId))];
    console.log('Selected Post:', selectedPost);
    console.log('Available Post IDs:', posts);

    return (
      <View style={{ backgroundColor: "#023047", height: "20%", width: "90%" }}>
        
        <Picker
          style={styles.background}
          selectedValue={selectedPost}
          onValueChange={itemValue => setSelectedPost(itemValue)}
        >
          {posts.map(post => (
            <Picker.Item key={post} label={`Post ${post}`} value={post} />
          ))}
        </Picker>
      </View>
    );
  };

  const renderCommentsList = () => {
    if (!comments.length) {
      return <Text>No comments available</Text>;
    }
    const filteredComments = comments.filter(comment => comment.postId.toString() === selectedPost.toString());
    console.log('Filtered Comments:', filteredComments);
    return (
      <View style={{ backgroundColor: "#023047", height: "100%", width: "100%", alignItems: 'center'}}>
        <View style={{marginTop:10}}>
        <FlatList
          data={filteredComments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentText}>{item.name}</Text>
            </View>
          )}
        />
        </View>
      </View>
    );
  };


  return (
    <View style={styles.scrollViewContent}>
      <Text style={{ marginTop: 10, fontSize: 35, marginLeft: 20, color: 'white',}}>Select a post:</Text>
      {renderDropdown()}
      <Text style={{ marginTop: 0, fontSize: 35, marginLeft: 20, color: 'white',}}>
          Comments:-
        </Text>
      {renderCommentsList()}
      
    </View>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    height: "100%",
    width: "100%",
    flexDirection:'column',
    backgroundColor: "#023047",
  },
  background: {
    backgroundColor: "#fb8500",
    height: "55%",
    color: 'white',
    borderRadius: 20,
    marginTop: 20,

  },
  commentItem: {
    borderWidth: 1,
    borderRadius: 20,
    width: "99%",
    alignItems: 'center',
    backgroundColor: "#ffb703",
    padding: 10,
    marginTop: 10
  },
  commentText: {
    fontSize: 16,
  },
});

export default App;

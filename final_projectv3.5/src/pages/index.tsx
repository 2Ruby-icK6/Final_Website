import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
  date: string;
}

interface User {
  id: number;
  name: string; 
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <div className="flex flex-col items-center mb-20">
          <Image src="/pic.jpg" alt="profile picture" width={150} height={50} className="w-24 h-24 rounded-full mb-4"/>
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Notes</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.post.map((post, index) => (
            <div key={index} className="bg-yellow-300 p-4 rounded-lg shadow-lg shadow-yellow-200">
              <h3 className="text-xl font-semibold text-gray-950 mb-2">{post.title}</h3>
              <p className="text-gray-900 mb-2">{post.content}</p>
              <p className="text-gray-900 text-sm">{post.date}</p>
            </div>
          ))}
        </div>
      </Container>
    </Main>
  );
};

export default Home;

import React, { FC } from 'react';
import './UserPosts.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface UserPostsProps {
}

const UserPosts: FC<UserPostsProps> = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const { userPosts } = location.state;
  const BackToUsersComp = () => {
    navigate('/user-list');
  }

  return <div className="UserPosts">
    {userPosts.map((post: any, index: any) => (
      <div key={index}>
        <h5>{post.title}</h5>
        <p>{post.body}</p>
      </div>
    ))}
    <button onClick={BackToUsersComp} className='btn btn-warning mt-2'>Back to users list</button>
  </div>
}

export default UserPosts;

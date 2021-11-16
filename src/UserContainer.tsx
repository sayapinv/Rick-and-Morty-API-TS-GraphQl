import { ApolloError } from '@apollo/client'
import { iUser } from './interfaces'

interface UsersItemProps {
  users: iUser[];
  error?: ApolloError;
}

const UserContainer = ({ users, error }: UsersItemProps) => {

  return (
    <div className="users_container">
      {!error ? users.map((item, index) =>
        <div className="user" key={index}>
          <img src={item.image} alt="no screen" />
          <p>Name: {item.name}</p>
          <p>Gender: {item.gender}</p>
          <p>Species: {item.species}</p>
          <p>Location: {item.location.name}</p>
          <p className={item.status === 'Alive' ? "green" : item.status === 'Dead' ? "red" : "def"}>Status: {item.status}</p>
        </div>
      ) : (<div className="error">
        <p>Ничего не найдено :(</p>
      </div>)}
    </div>
  )
}

export default UserContainer

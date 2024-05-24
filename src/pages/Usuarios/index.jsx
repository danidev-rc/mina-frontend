import { useEffect, useState } from 'react'
import Axios from 'axios'

const userURI = 'http://localhost:3000/api/usuarios'

export default function Usuarios() {
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    Axios.get(userURI).then((response) => {
      setUsers(response.data)
      console.log(response.data)
    })
  }

  const handleDelete = (userId) => {
    Axios.delete(`${userURI}/${userId}`).then(() => {
      fetchUsers()
    })
  }

  const handleEdit = (user) => {
    setEditUser(user)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    Axios.put(`${userURI}/${editUser._id}`, editUser).then(() => {
      setEditUser(null)
      fetchUsers()
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (editUser) {
      setEditUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }))
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }))
    }
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    Axios.post(userURI, newUser).then(() => {
      setNewUser({ nombre: '', email: '', password: '' })
      setShowAddForm(false)
      fetchUsers()
    })
  }

  return (
    <div>
      <h1 className='text-2xl'>Usuarios</h1>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className='bg-green-400 px-4 py-1 border rounded-xl'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className='bg-red-600 px-4 py-1 border rounded-xl text-white'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className='bg-blue-400 px-4 py-1 border rounded-xl mt-4'
      >
        {showAddForm ? 'Cancel' : 'Añadir Usuario'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddUser} className='mt-4'>
          <h2>Add User</h2>
          <label>
            Nombre:
            <input
              type='text'
              name='nombre'
              value={newUser.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={newUser.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={newUser.password}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Add User</button>
        </form>
      )}

      {editUser && (
        <form onSubmit={handleUpdate} className='mt-4'>
          <h2>Edit User</h2>
          <label>
            Nombre:
            <input
              type='text'
              name='nombre'
              value={editUser.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={editUser.email}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Update</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default function UserForm({ key, nombre, email }) {
  return (
    <div>
      <h1>Users Form</h1>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody key={key}>
          <tr>
            <td>{nombre}</td>
          </tr>
          <tr>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

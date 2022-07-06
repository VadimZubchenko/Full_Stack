const ContactList = (props) => {
  // generoidaan table with rows and

  let contacts = props.list.map((contact) => {
    return (
      <tr key={contact.id}>
        <td>{contact.firstname}</td>
        <td>{contact.lastname}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td>
          <button onClick={() => props.removeFromList(contact.id)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>email</th>
          <th>phone</th>
        </tr>
      </thead>
      <tbody>{contacts}</tbody>
    </table>
  );
};
export default ContactList;

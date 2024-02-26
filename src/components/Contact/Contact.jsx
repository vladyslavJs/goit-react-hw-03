// import css from './Contact.module.css';

import { ImUser, ImPhone, ImUserMinus } from 'react-icons/im';

const Contact = ({ data: { id, name, number }, onDelete }) => {
  return (
    <div>
      <p>
        Name: <ImUser />
        {name}
      </p>
      <p>
        Phone: <ImPhone />
        {number}
      </p>
      <button onClick={() => onDelete(id)}>Delete: 
        <ImUserMinus />
      </button>
    </div>
  );
};

export default Contact;
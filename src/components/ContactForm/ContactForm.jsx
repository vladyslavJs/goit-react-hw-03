import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { ImUser, ImPhone, ImUserPlus} from 'react-icons/im';

import { nanoid } from "nanoid";
import css from './ContactForm.module.css'

const ContactSchema = Yup.object().shape({
    name: Yup.string().min(3, 'To short').max(50, 'To long!').required('Required field, please!'),
    number: Yup.string().min(3, 'To short').max(50, 'To long!').required('Required field, please!')
});


const ContactForm = ({ onAdd }) => {
    const nameId = useId();
    const numberId = useId();

    return (
        <Formik initialValues={{ name: '', number: '' }}
            onSubmit={(values, actions) => {
                onAdd({ id: nanoid(), ...values });
                actions.resetForm();
            }}
        validationSchema={ContactSchema}
    >
      <Form className={css.container}>
        <div>
            <label htmlFor={nameId}>Name: <ImUser/></label>
            <Field type="text" name="name" id={nameId}></Field>
            <ErrorMessage name="name" component="p"/>       
        </div>

        <div>
            <label htmlFor={numberId}>Number: <ImPhone/> </label>
            <Field type="text" name="number" id={numberId} />
            <ErrorMessage name="number" component="p"/>           
        </div>
        <button type="submit">
          Add contact <ImUserPlus/>
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
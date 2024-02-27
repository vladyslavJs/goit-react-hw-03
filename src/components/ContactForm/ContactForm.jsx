import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { ImUser, ImPhone, ImUserPlus} from 'react-icons/im';

import { nanoid } from "nanoid";
import css from './ContactForm.module.css'

const ContactSchema = Yup.object().shape({
    name: Yup.string().min(3, 'To short').max(50, 'To long!').required('Required field!'),
    number: Yup.string().min(3, 'To short').max(50, 'To long!').required('Required field!')
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
            <label className={css.field} htmlFor={nameId}>Name: <ImUser/></label>
            <Field type="text" name="name" id={nameId}
             className={css.fieldfix} ></Field>
            <ErrorMessage className={css.error} name="name" component="p"/>       
        </div>

        <div >
            <label htmlFor={numberId}>Number: <ImPhone/> </label>
            <Field type="text" name="number" id={numberId} className={css.fieldfix} />
            <ErrorMessage className={css.error} name="number" component="p"/>           
        </div>
        <button className={css.button} type="submit">
          Add contact <ImUserPlus/>
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
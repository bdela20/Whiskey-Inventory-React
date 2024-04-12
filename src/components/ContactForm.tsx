import { useSubmit } from "react-router-dom"
import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../Api/Server"
import { useDispatch, useStore } from "react-redux"
import { chooseFirst, chooseLast, chooseEmail, chooseAddress, choosePhone } from "../redux/slices/RootSlice"

interface ContactFormProps {
  id?: string[];
  onClose: () => void;
}

const ContactForm = ( props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.first } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      dispatch(chooseFirst(data.first));
      dispatch(chooseLast(data.last));
      dispatch(chooseEmail(data.email));
      dispatch(choosePhone(data.phone_number));
      dispatch(chooseAddress(data.address));

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()

      props.onClose();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Make</label>
          <Input {...register('first')} name='first' placeholder="Make..." />
        </div>
        <div>
          <label htmlFor="name">Model</label>
          <Input {...register('last')} name='last' placeholder="Model..." />
        </div>
        <div>
          <label htmlFor="email">Year</label>
          <Input {...register('email')} name='email' placeholder="Year..." />
        </div>
        <div>
          <label htmlFor="phone_number">Mileage</label>
          <Input {...register('phone_number')} name='phone_number' placeholder="Mileage..." />
        </div>
        <div>
          <label htmlFor="address">Color</label>
          <Input {...register('address')} name='address' placeholder="Color..." />
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
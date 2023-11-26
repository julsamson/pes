// export const SignInForm = () => {
//   return (
//     <div>signinform</div>
//   )
// }


"use client"



import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  email: z.string().min(1, {
    message: "please enter valid email address."
  }).email({
    message: 'email should contain @..',
  }),

  room: z.string(),

  password: z.string().min(1, {
    message: 'Enter a valid password.'
  })
    .min(6, {
      message: 'Password must be at least 6 characters.',
  }),

  confirmpassword: z.string().min(1, {
    message: 'please confirm your password'
  })

})
.refine((data) => data.password === data.confirmpassword, {
  path: ['confirmpassword'],
  message: 'password do not match '
} )


export const SignInForm = () => {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log('submitted form!', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <div>
        <label htmlFor="username">Username</label>
        <Input
          placeholder="shadcn"
          {...register('username')}
        />
        {formState.errors.username && (
          <span>{formState.errors.username.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          // type="email" 
          placeholder="example@email.com"
          {...register('email')} />
        {formState.errors.email && (
          <span>{formState.errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="room">Room</label>
        <Input placeholder="Room 101" {...register('room')} />
        {formState.errors.room && (
          <span>{formState.errors.room.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          placeholder="********"
          {...register('password')} />
        {formState.errors.password && (
          <span>{formState.errors.password.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="confirmpassword">Confirmpassword</label>
        <Input
          type="password"
          placeholder="Re-Enter your password"
          {...register('confirmpassword')} />
        {formState.errors.confirmpassword && (
          <span>{formState.errors.confirmpassword.message}</span>
        )}
      </div>
      <Button type="submit">Submit</Button>

      <div>
        <p>already have an account,
          <Link href='/login' className='text-blue-400 underline'>login</Link>
        </p>
      </div>

    </form>
  );
};
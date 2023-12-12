"use client"



import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  // username: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.',
  // }),

  email: z.string().min(1, {
    message: "please enter valid email address."
  }).email({
    message: 'email should contain @..',
  }),

  password: z.string().min(1, {
    message: 'Enter a valid password.'
  })
    .min(6, {
      message: 'Password must be at least 6 characters.',
    }),
});

export const LogInForm = () => {

  const router = useRouter();

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    const loginData = await signIn('credentials', {
      email: data.email,
      password: data.password
    });

    if (loginData?.error) {
      console.log(loginData.error);
    } else {
      router.push('/admin')
    }
  };

  return (


    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <h2 className='text-center font-bold text-4xl'>
        Login
      </h2>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          // type="email" 
          id='email'
          placeholder="example@email.com"
          {...register('email')} />
        {formState.errors.email && (
          <span>{formState.errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          id='password'
          type="password"
          placeholder="********"
          {...register('password')} />
        {formState.errors.password && (
          <span>{formState.errors.password.message}</span>
        )}
      </div>
      <Button type="submit">Submit</Button>

      <div>
        <p>if you don&apos;t have an account, please&nbsp;
          <Link href='/sign-up' className='text-blue-400 underline'>sign up</Link>
        </p>
      </div>

    </form>
  );
};

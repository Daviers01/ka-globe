import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function Register() {
  const { login } = useAuth()
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const res = await api.post('/api/auth/register', data)
      const token = res.data?.token
      console.log(token, 'register token');
      console.log(data, 'register data');
      if (token) login(token)
    } catch (e: any) {
      console.error(e)
      alert(e?.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name (optional)</label>
          <input {...register('name')} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input {...register('email')} className="w-full border px-3 py-2 rounded" />
          {formState.errors.email && <p className="text-sm text-red-600">{formState.errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input {...register('password')} type="password" className="w-full border px-3 py-2 rounded" />
          {formState.errors.password && <p className="text-sm text-red-600">{formState.errors.password.message}</p>}
        </div>
        <div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}

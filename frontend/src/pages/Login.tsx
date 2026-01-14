import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const { login } = useAuth()
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const res = await api.post('/api/auth/login', data)
      const token = res.data?.token
      if (token) login(token)
    } catch (e: any) {
      alert(e?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
    </div>
  )
}

import React from 'react'
import { useNavigate } from '@umijs/max'
import { Button, ButtonVariant, Input, Card } from '@packages/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

enum LoginStatus {
  Idle = 1,
  Submitting = 2,
  Success = 3,
  Error = 4,
}

const schema = z.object({
  username: z.string().min(3, '用户名至少 3 个字符'),
  password: z.string().min(6, '密码至少 6 位'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const nav = useNavigate()
  const [status, setStatus] = React.useState<LoginStatus>(LoginStatus.Idle)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' },
  })

  async function onSubmit(values: FormValues) {
    if (status === LoginStatus.Submitting) return
    setStatus(LoginStatus.Submitting)
    try {
      await new Promise((r) => setTimeout(r, 600))
      localStorage.setItem('token', `dummy-${values.username}`)
      setStatus(LoginStatus.Success)
      nav('/dashboard')
    } catch (err) {
      setStatus(LoginStatus.Error)
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-background p-6">
      <Card className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-1 text-center">
          <div className="text-xl font-semibold">登录</div>
          <div className="text-sm text-muted-foreground">请输入您的账号密码</div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm" htmlFor="username">用户名</label>
            <Input id="username" placeholder="admin" {...register('username')} />
            {errors.username && (
              <div className="text-sm text-destructive">{errors.username.message}</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm" htmlFor="password">密码</label>
            <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
            {errors.password && (
              <div className="text-sm text-destructive">{errors.password.message}</div>
            )}
          </div>
          <Button
            variant={ButtonVariant.Default}
            className="w-full"
            disabled={status === LoginStatus.Submitting}
          >
            {status === LoginStatus.Submitting ? '登录中…' : '登录'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

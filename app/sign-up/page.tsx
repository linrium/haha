"use client"

import { useForm } from "@tanstack/react-form"
import Link from "next/link"
import { toast } from "sonner"
import z from "zod/v4"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { sleep } from "@/lib/utils"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export default function Page() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await sleep(1000)
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: "",
        callbackURL: "/dashboard",
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Sign up successfully")
      }
    },
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            id="sign-up-form"
          >
            <FieldGroup>
              <form.Field
                name="email"
                // biome-ignore lint/correctness/noChildrenProp: no
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        type="email"
                        disabled={form.state.isSubmitting}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="password"
                // biome-ignore lint/correctness/noChildrenProp: no
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter your password"
                        type="password"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              // biome-ignore lint/correctness/noChildrenProp: no
              children={([canSubmit, isSubmitting]) => (
                <>
                  <Button
                    type="submit"
                    form="sign-up-form"
                    disabled={!canSubmit}
                  >
                    {isSubmitting && <Spinner data-icon="inline-start" />}
                    Sign Up
                  </Button>
                  <Button asChild variant="link">
                    <Link href="/sign-in">If you have an account, sign in</Link>
                  </Button>
                </>
              )}
            />
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

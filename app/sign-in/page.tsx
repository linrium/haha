"use client"

import { useForm, useStore } from "@tanstack/react-form"
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
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: "/dashboard",
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Sign in successfully")
      }
    },
  })

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            id="sign-in-form"
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                    form="sign-in-form"
                    disabled={!canSubmit}
                  >
                    {isSubmitting && <Spinner data-icon="inline-start" />}
                    Sign In
                  </Button>
                  <Button asChild variant="link">
                    <Link href="/sign-up">
                      If you don't have an account, sign up
                    </Link>
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

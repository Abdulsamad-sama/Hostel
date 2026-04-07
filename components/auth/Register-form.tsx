"use client";
import { CardWrapper } from "@/components/auth/Card-wrapper";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerlabel="Let's go"
      backbuttonlabel="Already have an account?"
      backbuttonref="/auth/login"
    >
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <>
                  <FieldLabel>Fullname</FieldLabel>
                  <Input {...field} placeholder="Enter your fullname" type="" />
                  <FieldError>
                    {form.formState.errors.fullname?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
          </FieldGroup>
        </Field>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
          </FieldGroup>
        </Field>
        <Field>
          <FieldGroup>
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="off"
                  />
                  <FieldError>
                    {form.formState.errors.password?.message}
                  </FieldError>
                </>
              )}
            ></Controller>
          </FieldGroup>
        </Field>

        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </CardWrapper>
  );
}

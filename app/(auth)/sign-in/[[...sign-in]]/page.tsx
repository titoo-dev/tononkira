"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] w-full items-center px-4 py-16">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <div className="relative mx-auto w-full max-w-md">
              {/* Background decorative elements */}
              <div className="from-primary/20 via-accent/20 to-secondary/20 absolute -z-10 h-full w-full animate-pulse rounded-3xl bg-gradient-to-br blur-xl"></div>
              <div className="bg-primary/30 absolute -right-4 bottom-8 -z-10 h-24 w-24 rounded-full blur-xl"></div>
              <div className="bg-accent/30 absolute top-8 -left-4 -z-10 h-24 w-24 rounded-full blur-xl"></div>

              <SignIn.Step name="start">
                <Card className="border-border/40 bg-card/95 shadow-xl backdrop-blur-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                      Sign in to Tononkira
                    </CardTitle>
                    <CardDescription>
                      Welcome back! Please sign in to continue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Clerk.Connection name="facebook" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="border-primary/30 hover:bg-primary/10 rounded-full"
                        >
                          <Clerk.Loading scope="provider:facebook">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <SiFacebook className="mr-2 size-4" />
                                  Facebook
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="border-primary/30 hover:bg-primary/10 rounded-full"
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <SiGoogle className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className="text-muted-foreground before:bg-border after:bg-border flex items-center gap-x-3 text-sm before:h-px before:flex-1 after:h-px after:flex-1">
                      or
                    </p>
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input className="rounded-full" />
                      </Clerk.Input>
                      <Clerk.FieldError className="text-destructive block text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-4">
                      <SignIn.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="shadow-primary/20 rounded-full font-medium shadow-lg"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="font-medium"
                      >
                        <Clerk.Link navigate="sign-up">
                          Don&apos;t have an account? Sign up
                        </Clerk.Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="border-border/40 bg-card/95 shadow-xl backdrop-blur-sm">
                  <CardHeader className="space-y-2">
                    <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                      Use another method
                    </CardTitle>
                    <CardDescription>
                      Facing issues? You can use any of these methods to sign
                      in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 w-full rounded-full"
                        disabled={isGlobalLoading}
                      >
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 w-full rounded-full"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <SignIn.Action
                      navigate="previous"
                      asChild
                      className="w-full"
                    >
                      <Button
                        disabled={isGlobalLoading}
                        className="shadow-primary/20 w-full rounded-full font-medium shadow-lg"
                      >
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <Loader className="size-4 animate-spin" />
                            ) : (
                              "Go back"
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="border-border/40 bg-card/95 shadow-xl backdrop-blur-sm">
                    <CardHeader className="space-y-2">
                      <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                        Enter your password
                      </CardTitle>
                      <CardDescription>
                        Please enter your password to continue
                      </CardDescription>
                      <p className="text-muted-foreground bg-muted mt-1 inline-block rounded-full px-3 py-1 text-sm">
                        <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input className="rounded-full" />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive block text-sm" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-4">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="shadow-primary/20 rounded-full font-medium shadow-lg"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button
                            type="button"
                            size="sm"
                            variant="link"
                            className="font-medium"
                          >
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="border-border/40 bg-card/95 shadow-xl backdrop-blur-sm">
                    <CardHeader className="space-y-2">
                      <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                        Check your email
                      </CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-muted-foreground bg-muted mt-1 inline-block rounded-full px-3 py-1 text-sm">
                        <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>
                        <div className="grid items-center justify-center gap-y-4">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="border-input bg-background data-[status=selected]:ring-primary data-[status=cursor]:ring-primary relative flex h-12 w-12 items-center justify-center rounded-lg border text-lg shadow-sm transition-all data-[status=cursor]:ring-2 data-[status=selected]:ring-2"
                                  >
                                    {value}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="text-destructive block text-center text-sm" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button
                                variant="link"
                                size="sm"
                                disabled
                                className="font-medium"
                              >
                                Resend code in (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                s)
                              </Button>
                            )}
                          >
                            <Button
                              variant="link"
                              size="sm"
                              className="font-medium"
                            >
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-4">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="shadow-primary/20 rounded-full font-medium shadow-lg"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Loader className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button
                            size="sm"
                            variant="link"
                            className="font-medium"
                          >
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </div>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}

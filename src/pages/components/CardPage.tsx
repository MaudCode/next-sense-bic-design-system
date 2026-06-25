import { PageHeader, Section } from "@/components/docs";
import { Example } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter,
} from "@/components/ui/card";

export function CardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Card"
        lead="The surface every widget sits on — white fill, hairline border, 12px radius, warm soft shadow. Composed from CardHeader, CardTitle, CardDescription, CardContent and CardFooter."
      />

      <Section title="Anatomy">
        <Example
          code={`<Card className="w-80">
  <CardHeader>
    <CardTitle>Avg Temperature</CardTitle>
    <CardDescription>Last 7 days</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="font-formula text-4xl">22.3°C</div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">View detail</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-80 text-left">
            <CardHeader>
              <CardTitle>Avg Temperature</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-formula text-4xl font-medium text-fg-1">22.3°C</div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">View detail</Button>
            </CardFooter>
          </Card>
        </Example>
      </Section>

      <Section title="With header action">
        <Example
          code={`<Card>
  <CardHeader>
    <CardTitle>ECM Tracker</CardTitle>
    <CardDescription>14 measures</CardDescription>
    <CardAction><Button size="sm">New ECM</Button></CardAction>
  </CardHeader>
</Card>`}
        >
          <Card className="w-80 text-left">
            <CardHeader>
              <CardTitle>ECM Tracker</CardTitle>
              <CardDescription>14 measures</CardDescription>
              <CardAction><Button size="sm">New ECM</Button></CardAction>
            </CardHeader>
          </Card>
        </Example>
      </Section>
    </>
  );
}

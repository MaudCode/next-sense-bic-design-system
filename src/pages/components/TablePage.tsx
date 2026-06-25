import { PageHeader, Section } from "@/components/docs";
import { Preview, CodeBlock } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const ROWS = [
  { code: "RVRMDW", name: "Riverside Mews", portfolio: "Northwind", area: "12,500", eui: "135.2" },
  { code: "HRBGTW", name: "Harbour Gate", portfolio: "Meridian", area: "28,000", eui: "168.7" },
  { code: "OLVPRK", name: "Olive Park", portfolio: "Crestline", area: "22,400", eui: "112.3" },
  { code: "CDRPLZ", name: "Cedar Plaza", portfolio: "Crestline", area: "35,000", eui: "98.4" },
  { code: "AURTWR", name: "Aurora Tower", portfolio: "Lighthouse", area: "31,000", eui: "178.3" },
];

const CODE = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Code</TableHead>
      <TableHead>Building</TableHead>
      <TableHead>Portfolio</TableHead>
      <TableHead className="text-right">Gross area (m²)</TableHead>
      <TableHead className="text-right">EUI (kWh/m²)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.code}>
        <TableCell className="font-mono text-fg-2">{r.code}</TableCell>
        <TableCell>{r.name}</TableCell>
        <TableCell><Badge variant="secondary">{r.portfolio}</Badge></TableCell>
        <TableCell className="text-right font-mono">{r.area}</TableCell>
        <TableCell className="text-right font-mono">{r.eui}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`;

export function TablePage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Table"
        lead="Dense, scannable rows for portfolio and ECM data. Hairline row dividers, a tinted header, Instrument Sans for text and mono for numbers so columns line up."
      />
      <Section title="Example">
        <Preview center={false}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead className="text-right">Gross area (m²)</TableHead>
                <TableHead className="text-right">EUI (kWh/m²)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.code}>
                  <TableCell className="font-mono text-fg-2">{r.code}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell><Badge variant="secondary">{r.portfolio}</Badge></TableCell>
                  <TableCell className="text-right font-mono">{r.area}</TableCell>
                  <TableCell className="text-right font-mono">{r.eui}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Preview>
        <CodeBlock code={CODE} />
      </Section>
    </>
  );
}

import { Card } from "@/components/cards";


 
export default async function Page() { 
    
  return (
    <main className="">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Verifiers" value='' type="verifiers" /> 
        <Card title="Total Cards" value='' type="cards" />
         <Card title="Total Invoices" value='' type="cards" />
       
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
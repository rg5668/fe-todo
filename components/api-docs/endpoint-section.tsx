import EndpointItem from '@/components/api-docs/endpoint-item';
import { EndpointSectionProps } from '@/interfaces/api-docs.interface';

export default function EndpointSection({ title, endpoints }: EndpointSectionProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="border-b p-4 dark:border-slate-800">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="divide-y dark:divide-slate-800">
        {endpoints.map((endpoint, index) => (
          <EndpointItem key={index} endpoint={endpoint} />
        ))}
      </div>
    </div>
  );
}

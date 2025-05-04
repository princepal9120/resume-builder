export interface DashboardHeaderProps {
    heading: string;
    text?: string;
    children?: React.ReactNode;
  }
  
  export function DashboardHeader({
    heading,
    text,
    children,
  }: DashboardHeaderProps) {
    return (
      <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
        {children}
      </div>
    );
  }
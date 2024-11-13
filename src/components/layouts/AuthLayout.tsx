import { ReactNode } from 'react';
import { Scissors } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="min-h-screen backdrop-blur-sm bg-background/60 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-slide-up">
          <div className="glass-effect rounded-2xl p-8 shadow-2xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="flex justify-center">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <Scissors className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
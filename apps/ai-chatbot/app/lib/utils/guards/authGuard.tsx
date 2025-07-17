

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return children;
}
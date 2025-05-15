import Loading from '@/components/Loading';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { Suspense } from 'react';

export default function ResetPassword() {
    return (
        <Suspense fallback={<Loading />}>
            <ResetPasswordForm />
        </Suspense>
    );
}

'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { deleteProductAction } from '../actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

        setIsDeleting(true);
        try {
            const res = await deleteProductAction(id);
            if (!res.success) {
                alert('Failed to delete: ' + res.error);
            }
        } catch (e) {
            alert('Error deleting product');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
        >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}

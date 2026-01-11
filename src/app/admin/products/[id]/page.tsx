import { ProductForm } from '../product-form';
import { updateProductAction } from '../actions';
import { getZohoProduct } from '@/lib/zoho-inventory';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getZohoProduct(id);

    if (!product) {
        notFound();
    }

    return <ProductForm initialData={product} action={async (formData) => {
        'use server';
        return await updateProductAction(id, null, formData);
    }} />;
}

import { ProductForm } from '../product-form';
import { createProductAction } from '../actions';
// @ts-ignore
import { useActionState } from 'react'; // Not using this yet, manual submission

export default function NewProductPage() {
    return <ProductForm action={async (formData) => {
        'use server';
        return await createProductAction(null, formData);
    }} />;
}

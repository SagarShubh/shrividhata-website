import { ProductForm } from '../product-form';
import { createProductAction } from '../../actions';

export default function NewProductPage() {
    return <ProductForm action={async (formData) => {
        'use server';
        return await createProductAction(null, formData);
    }} />;
}

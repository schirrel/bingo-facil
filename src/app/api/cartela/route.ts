
import { cartelas as cartelasData } from '@/app/api/cartela/data';
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.searchParams);
        const cartelaNum = parseInt(searchParams.get("number") ?? '');
        const cartela = cartelasData[cartelaNum - 1];
        return Response.json({ cartela });
    } catch (ex) {
        console.error(ex);
        Response.error()
    }
}
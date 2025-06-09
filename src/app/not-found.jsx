import Error from "@/components/Error";

export default function NotFound() {
  return <Error message="هذه الصفحة غير موجودة" showHomeRoute={true} />;
}

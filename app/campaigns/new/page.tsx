import { redirect } from "next/navigation";

export default function CampaignsNewRedirect() {
  // При нажатии "Новая кампания" перенаправляем сразу в редактор с id=new
  redirect("/editor/new");
}

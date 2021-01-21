export const ThaiDateFormat = (datetime:any) =>{
    const arr1 = datetime.split("-");
    const arr2 = arr1[2].split(" ");
    const date = new Date(arr1[0],arr1[1]-1,arr2[0]);
    const result = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return result
}
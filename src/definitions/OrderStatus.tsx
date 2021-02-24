export default interface OrderStatus {
  waiting_sale_approve: "รออนุมัติคำสั่งซื้อ";
  waiting_confirm: "รอยืนยันคำสั่งซื้อ";
  waiting_payment: "รอชำระเงิน";
  paid: "ชำระเงินแล้ว";
  confirmed: "ยืนยันคำสั่งซื้อแล้ว";
  opened: "กำลังดำเนินการ";
  delivering: "สินค้าอยู่ระหว่างจัดส่ง";
  success: "สินค้าส่งถึงมือลูกค้าแล้ว";
  company_canceled: "ยกเลิกคำสั่งซื้อโดยบริษัท";
  customer_canceled: "ยกเลิกคำสั่งซื้อโดยร้านค้า";
  rejected: "ไม่อนุมัติคำสั่งซื้อ";
}

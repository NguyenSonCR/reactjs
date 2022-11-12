import PurchaseItem from '../PurchaseItem';

function PurchaseContent({ content, data }) {
  const { orders, cancel, confirm, shipper, transported, done } = data;

  let body = null;

  switch (content) {
    case 1:
      body = <PurchaseItem data={{ title: 'TẤT CẢ', listOrder: orders, content }} />;
      break;
    case 2:
      body = <PurchaseItem data={{ title: 'CHỜ XÁC NHẬN', listOrder: confirm, content }} />;
      break;
    case 3:
      body = <PurchaseItem data={{ title: 'CHỜ LẤY HÀNG', listOrder: shipper, content }} />;
      break;
    case 4:
      body = (
        <PurchaseItem
          data={{
            title: 'ĐANG GIAO',
            listOrder: transported,
            content,
          }}
        />
      );
      break;
    case 5:
      body = <PurchaseItem data={{ title: 'ĐÃ GIAO', listOrder: done, content }} />;
      break;
    case 6:
      body = <PurchaseItem data={{ title: 'ĐÃ HỦY', listOrder: cancel, content }} />;
      break;
    default:
      break;
  }
  return body;
}

export default PurchaseContent;

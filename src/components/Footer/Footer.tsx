import { t } from 'i18next'

function Footer() {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 text-sm lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. {t('全ての権利は保留されています')}.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              {t('国と地域シンガポールインドネシア台湾タイマレーシアベトナムフィリピンブラジルメキシココロンビアチリ')}
            </div>
          </div>
        </div>
        <div className='mt-16 grid grid-cols-2  px-36 text-xs font-light lg:grid-cols-4 '>
          <div className='lg:col-span-1'>{t('プライバシーポリシー')}</div>
          <div className='lg:col-span-1'>{t('運営規則')}</div>
          <div className='lg:col-span-1'>{t('配送ポリシー')}</div>
          <div className='lg:col-span-1'>{t('返品返金ポリシー')}</div>
        </div>

        <div className='mt-10 text-center text-sm'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-4 text-xs'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-4 text-xs'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-4 text-xs'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-4 text-xs'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  jp: 'Japanese',
  vi: 'Tiếng Việt'
}
const resources = {
  jp: {
    translation: {
      すべてのカテゴリー: 'すべてのカテゴリー',
      検索フィルター: '検索フィルター',
      価格帯: '価格帯',
      から: 'から',
      まで: 'まで',
      検索: '検索',
      カスタマーレビュー: 'カスタマーレビュー',
      以上: '以上',
      すべて削除: 'すべて削除',
      並べ替え順: '並べ替え順',
      人気: '人気',
      最新: '最新',
      販売: '販売',
      価格: '価格',
      安いものから高いものまで: '安いものから高いものまで',
      高から低まで: ' 高から低まで',
      個売れた: '個 売れた',
      登録: '登録',
      ログイン: 'ログイン',
      登録して最大70000の新しいクーポンを受け取りましょう: '70,000ドンまで割引クーポンを登録して受け取る',
      前へ: '前へ',
      次: '次',
      全ての権利は保留されています: '全ての権利は保留されています',
      国と地域シンガポールインドネシア台湾タイマレーシアベトナムフィリピンブラジルメキシココロンビアチリ:
        '国と地域：シンガポールインドネシア台湾タイマレーシアベトナムフィリピンブラジルメキシココロンビアチリ',
      プライバシーポリシー: 'プライバシーポリシー',
      運営規則: '運営規則',
      配送ポリシー: '配送ポリシー',
      返品返金ポリシー: '返品・返金ポリシー',
      アカウントを持っていません: 'アカウントを持っていません',
      アカウント: 'アカウント',
      カード: 'カード',
      ログアウト: 'ログアウト',
      img: '最大1MBのファイルサイズとpng、jpg、jpeg、bmp形式',
      profile: '私のプロフィール',
      アカウントを管理および保護する: 'アカウントを管理および保護する'
    }
  },
  vi: {
    translation: {
      すべてのカテゴリー: 'TẤT CẢ DANH MỤC',
      検索フィルター: 'BỘ LỌC TÌM KIẾM',
      価格帯: 'Khoảng giá',
      から: 'Từ',
      まで: 'Đến',
      検索: 'Áp Dụng',
      カスタマーレビュー: 'Đánh Giá',
      以上: 'Trở lên',
      すべて削除: 'XÓA TẤT CẢ',
      並べ替え順: 'Sắp Xếp Theo',
      人気: 'Phổ Biến',
      最新: 'Mới Nhất',
      販売: 'Bán Chạy',
      価格: 'Giá',
      安いものから高いものまで: 'Thấp đến cao',
      高から低まで: 'Cao đến thấp',
      個売れた: ' Đã bán',
      登録: 'Đăng Ký',
      ログイン: 'Đăng Nhập',
      登録して最大70000の新しいクーポンを受け取りましょう: 'Đăng ký và nhận voucher giảm đến 70K ',
      前へ: 'Prev',
      次: 'Next',
      全ての権利は保留されています: 'Tất cả các quyền được bảo lưu.',
      国と地域シンガポールインドネシア台湾タイマレーシアベトナムフィリピンブラジルメキシココロンビアチリ:
        'Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México Colombia Chile',
      プライバシーポリシー: 'CHÍNH SÁCH BẢO MẬT',
      運営規則: 'QUY CHẾ HOẠT ĐỘNG',
      配送ポリシー: 'CHÍNH SÁCH VẬN CHUYỂN',
      返品返金ポリシー: 'CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN',
      アカウントを持っていません: 'Bạn chưa có tài khoản',
      アカウント: 'Tài Khoản Của Tôi',
      カード: 'Đơn mua',
      ログアウト: 'Đăng xuất',
      img: 'Dung lượng file tối đa 1MB Và Định Dạng png, jpg, jpeg, bmp',
      profile: 'Hồ Sơ Của Tôi',
      アカウントを管理および保護する: 'Quản lý thông tin hồ sơ để bảo mật tài khoản'
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n

import { useRouter } from 'next/navigation'
import React from 'react'
import { Modal, notification } from 'antd'
import AdminPanelReservationForm from '@/app/(crm)/admin/search/AdminPanelReservationForm'
import axs from '@/lib/axios'

interface IAdminPanelReservationModal {
  showModal: boolean
  setShowModal: (b: boolean) => void
}

export const AdminPanelReservationModal = ({
  showModal,
  setShowModal,
}: IAdminPanelReservationModal) => {
  const [api, context] = notification.useNotification()
  const router = useRouter()

  const closeModal = () => setShowModal(false)
  const onSubmit = (values: object) => {
    axs
      .post('/crm/sales/create', values)
      .then((res) => {
        api.success({
          message: 'Succes',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 3,
          closable: true,
        })
        closeModal()
        router.push('/admin/tickets')
      })
      .catch((err) => {
        api.error({
          message: 'Eroare',
          description: err.response.data.message,
          placement: 'bottomRight',
          duration: 2,
          closable: true,
        })
        console.log(err.response.data)
      })
  }
  return (
    <Modal
      open={showModal}
      title="Rezervare"
      closable={true}
      onClose={closeModal}
      onCancel={closeModal}
      centered
      footer={[]}
      destroyOnClose
    >
      {context}
      <AdminPanelReservationForm onSubmit={onSubmit} closeModal={closeModal} />
    </Modal>
  )
}

// const response = {
//   type: 'tur',
//   airline: 'Tarom',
//   fly_from: 'BVA',
//   fly_to: 'IAS',
//   fly_from_city: 'Paris',
//   fly_to_city: 'Iași',
//   date_from: '2024-07-11T00:00:00.000000Z',
//   date_to: '2024-08-26T00:00:00.000000Z',
//   source: 'online',
//   comment: 'Lorem ipsum',
//   extra:
//     '{\n   "id":"1cb2231a4ddb0000751d38c0_0|231a1cb24df30000ca3ece1e_0",\n   "flyFrom":"BVA",\n   "flyTo":"IAS",\n   "cityFrom":"Paris",\n   "cityCodeFrom":"PAR",\n   "cityTo":"Iași",\n   "cityCodeTo":"IAS",\n   "countryFrom":{\n      "code":"FR",\n      "name":"Franța"\n   },\n   "countryTo":{\n      "code":"RO",\n      "name":"România"\n   },\n   "local_departure":"2024-07-27T09:05:00.000Z",\n   "utc_departure":"2024-07-27T07:05:00.000Z",\n   "local_arrival":"2024-07-27T13:00:00.000Z",\n   "utc_arrival":"2024-07-27T10:00:00.000Z",\n   "distance":1895.96,\n   "duration":{\n      "departure":10500,\n      "return":10500,\n      "total":21000\n   },\n   "price":315,\n   "fare_locks":{\n      "EUR":[\n         {\n            "default":false,\n            "duration":"P1D",\n            "itinerary_price_limit":515,\n            "itinerary_price_remaining":315,\n            "fare_lock_kind":"fee",\n            "price":15.75,\n            "rule_instance_id":26749,\n            "version":"v1"\n         },\n         {\n            "default":true,\n            "duration":"P3D",\n            "itinerary_price_limit":515,\n            "itinerary_price_remaining":315,\n            "fare_lock_kind":"fee",\n            "price":31.5,\n            "rule_instance_id":26748,\n            "version":"v1"\n         },\n         {\n            "default":false,\n            "duration":"P7D",\n            "itinerary_price_limit":515,\n            "itinerary_price_remaining":315,\n            "fare_lock_kind":"fee",\n            "price":78.75,\n            "rule_instance_id":26750,\n            "version":"v1"\n         }\n      ]\n   },\n   "bags_price":{\n      "1":139.5405,\n      "2":279.081\n   },\n   "availability":{\n      "seats":5\n   },\n   "airlines":[\n      "W4"\n   ],\n   "route":[\n      {\n         "id":"1cb2231a4ddb0000751d38c0_0",\n         "combination_id":"1cb2231a4ddb0000751d38c0",\n         "flyFrom":"BVA",\n         "flyTo":"IAS",\n         "cityFrom":"Paris",\n         "cityCodeFrom":"PAR",\n         "cityTo":"Iași",\n         "cityCodeTo":"IAS",\n         "local_departure":"2024-07-27T09:05:00.000Z",\n         "local_arrival":"2024-07-27T13:00:00.000Z",\n         "airline":"W4",\n         "flight_no":3664\n      },\n      {\n         "id":"231a1cb24df30000ca3ece1e_0",\n         "combination_id":"231a1cb24df30000ca3ece1e",\n         "flyFrom":"IAS",\n         "flyTo":"BVA",\n         "cityFrom":"Iași",\n         "cityCodeFrom":"IAS",\n         "cityTo":"Paris",\n         "cityCodeTo":"PAR",\n         "local_departure":"2024-08-20T06:15:00.000Z",\n         "local_arrival":"2024-08-20T08:10:00.000Z",\n         "airline":"W4",\n         "flight_no":3663\n      }\n   ],\n   "booking_token":"Hi_MURhiTR_b0TZ-wKVtrLXoY00pDi79vhSMBkO-pXw5wFug_ISKTi-AC7dzt_OBJx6l1D979sCvASIxB-nTBUJ157Hov6b5KsOH0g4PsPSS-C04NyW3KqC8OWCPKnU3ciROVCWIcLMMyaI12hh9uyV0qf7rr6FqkuqB5w5d95Ii60SgoSW3tNE2IO5HwDzRZdeo-Q2ubISnS9dpMlcpYUC77rVlcAHGSR0GsxJLQUy2O7lLoszBzXCQftNtJQe-NpW-UZFntJ3BWVSez1ZGmLQhhjZRKE_aUON_jk1_-4KSIzybkNpkSt0tBhr6Ea1bapFTx_psYUkupdidJrOskhERPZ4seZENi4K9b2eYjh5gm_hAEr0RpzgRzWYjqT5HZAwfc4cJsDTOuYQ-OsSBk5qxtfsgKIsOHC5NyoT7sQIPmlrJsv-FZ_n6edQan6Pp9sqhzixBjrja6_RJEXqaR4YWxG8p5v_rum9IT2_Dp_qBvlYHaF_a2In8kaa7lMzDhzeSG7hemDHABGfb0eNLat02n2wpvUXbQjHCFPXydLKbDk-NHFgPpjKoLawrIt8b_DjvfDCQLen04R7WzZWbRSDtMKRCe7slGOacsoWmpGDC6exsrSaOuZpE-dLXOim5b",\n   "has_airport_change":false,\n   "offer_variants":null\n}',
//   operator_id: 1,
//   reserved_at: '2024-07-02T17:44:45.000000Z',
//   updated_at: '2024-07-02T17:44:45.000000Z',
//   created_at: '2024-07-02T17:44:45.000000Z',
//   id: 2,
//   passengers: [
//     {
//       id: 3,
//       first_name: 'slex',
//       last_name: 'cccc',
//       gender: 'M',
//       phone: '+37370456654',
//       email: 'lorem@mail.com',
//       passport: null,
//       price_sold: null,
//       price_cost: null,
//       bag_10kg: false,
//       bag_20kg: false,
//       date_of_birth: '1997-08-26T00:00:00.000000Z',
//       passport_issued_at: '1997-08-26T00:00:00.000000Z',
//       passport_expires_at: '2025-08-26T00:00:00.000000Z',
//       passport_series: 'AB',
//       passport_number: '89372489',
//       passport_country: 'MD',
//       reservation_code: 'FLY234432',
//       called_72_hours_tur: false,
//       called_72_hours_retur: false,
//       called_24_hours_tur: false,
//       called_24_hours_retur: false,
//       called_after_tur: false,
//       called_after_retur: false,
//       check_in_tur: false,
//       check_in_retur: false,
//       sale_id: 2,
//       created_at: '2024-07-02T17:44:45.000000Z',
//       updated_at: '2024-07-02T17:44:45.000000Z',
//     },
//   ],
// }

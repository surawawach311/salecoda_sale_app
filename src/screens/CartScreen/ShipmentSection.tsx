import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { ModalDeliveryMethod } from './ModalDeliveryMethod'
import { SHIPPING_METHOD_MAPPING } from '../../definitions/ShippingMethod'
import { CartDataSource } from '../../datasource/CartDataSource'
import { Shipment } from './Shipment'
import Heading3 from '../../components/Font/Heading3'
import Paragraph1 from '../../components/Font/Paragraph1'
import Paragraph2 from '../../components/Font/Paragraph2'
import Text1 from '../../components/Font/Text1'

interface Props {
  brand: string
  shopNo: string
  onChange?: (value?: Shipment) => void
  withDefault?: boolean
}

const ShipmentSection: React.FC<Props> = ({ brand, shopNo, onChange, withDefault }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Shipment[]>([])
  const [methods, setMethods] = useState<string[]>([])
  const [selected, setSelected] = useState<Shipment>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    CartDataSource.getShipment(shopNo, brand).then((response) => {      
      const availableMethods: string[] = response.responseData.map((item) => item.shipping_method)
      const availableShipments: Shipment[] = response.responseData.flatMap((item) => {
        return item.addresses.map((a, i) => ({
          id: `${item.shipping_method}-${i}`,
          method: item.shipping_method,
          name: a.name,
          telephone: a.telephone,
          address: a.address,
          district: a.district,
          subDistrict: a.sub_district,
          province: a.province,
          postCode: a.post_code,
          remark: '',
        }))
      })
      withDefault && selectDefault(availableMethods, availableShipments)
      setMethods(availableMethods)
      setData(availableShipments)
      setIsLoading(false)
    })
  }, [])

  const selectDefault = (availableMethods: string[], availableShipments: Shipment[]) => {
    if (availableMethods.length > 0) {
      let m = availableMethods[0]
      let s = availableShipments.find((x) => x.method === m)
      if (s) {
        setSelected(s)
        onChange?.(s)
      }
    }
  }

  const handleConfirmModal = (s: Shipment) => {
    setSelected(s)
    setShowModal(false)
    onChange?.(s)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const renderRemark = (s: Shipment) => {
    return s.remark ? (
      <>
        <View style={styled.line} />
        <View style={{ marginTop: 8 }}>
          <Heading3>หมายเหตุ (สำหรับลูกค้า)</Heading3>
          <Text1 style={styled.textRemark}>{s.remark}</Text1>
        </View>
      </>
    ) : null
  }

  return (
    <>
      {showModal && (
        <ModalDeliveryMethod
          onClose={handleCloseModal}
          availableMethods={methods}
          availableShipments={data}
          onOk={handleConfirmModal}
          activeShipment={selected}
          defaultRemark={selected?.remark}
        />
      )}
      <View style={styled.container}>
        <View style={styled.headerDeliveryMethodtContainer}>
          <Heading3>สถานที่รับสินค้า/สถานที่จัดส่ง</Heading3>
          {selected && (
            <TouchableOpacity onPress={handleOpenModal}>
              <Paragraph2 style={{ color: '#4C95FF' }}>เปลี่ยน</Paragraph2>
            </TouchableOpacity>
          )}
        </View>
        <View style={styled.line} />
        {isLoading ? (
          <View style={[styled.container, { paddingVertical: 16 }]}>
            <ActivityIndicator size="large" color="#4C95FF" />
          </View>
        ) : selected ? (
          <>
            <View style={styled.deliveryPointContainer}>
              <Image style={styled.iconLocation} source={require('../../../assets/location.png')} />
              <View style={styled.deliveryMethodtContainer}>
                <Heading3 style={styled.textDeliveryMethod}>{SHIPPING_METHOD_MAPPING[selected.method]}</Heading3>
                <Text style={styled.textDeliveryPoint}>
                  <Paragraph1>{`${selected.name}\n`}</Paragraph1>
                  <Paragraph1>{`${selected.address} ${selected.subDistrict}\n`}</Paragraph1>
                  <Paragraph1>{`${selected.district} ${selected.province} ${selected.postCode}`}</Paragraph1>
                </Text>
              </View>
            </View>
            {renderRemark(selected)}
          </>
        ) : (
          <TouchableOpacity style={styled.buttonDelivery} onPress={handleOpenModal}>
            <Image style={styled.iconDelivery} source={require('../../../assets/delivery.png')} />
            <Text style={styled.textButtonDelivery}> เลือกการจัดส่ง</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}

export default ShipmentSection

const styled = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonDelivery: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    margin: 10,
    alignItems: 'center',
  },
  iconDelivery: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  iconLocation: { width: 20, height: 20, resizeMode: 'contain' },
  textButtonDelivery: { color: '#4C95FF', fontSize: 14, fontWeight: 'bold' },
  line: {
    marginTop: 10,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 2,
    borderRadius: 3,
  },
  deliveryPointContainer: {
    margin: 20,
    flexDirection: 'row',
    marginBottom: 10,
  },
  textDeliveryPoint: {
    color: '#616A7B',
  },
  textRemark: {
    color: '#616A7B',
    paddingTop: 12,
    paddingBottom: 8,
  },
  deliveryMethodtContainer: { marginLeft: 10 },
  textDeliveryMethod: {
    color: '#616A7B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerDeliveryMethodtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

import { useEffect } from 'react'
import { useRouter } from 'next/router'




import LoginLayout from '../../layouts/FormOne'

const Login = ({ user }) => {
  const router = useRouter()

  useEffect(() => {
  
  }, [])



  const onSubmit = async (loginVariables) => {
    alert("silahkan Di lihat di console")
    console.log(loginVariables)
  }

  const propsData = [
    {
      logo: '/img/logojds.png',
      formTitle: 'Form Pendaftaran Online',
      formDescription: 'Daftar Secara Online Dengan Mudah Di Jabar Digital Service',  
      inputs: [
        {
          label: 'Nama Lengkap ',
          name: 'fullnamed',
          type: 'text',
          placeholder: 'eg. Ricky Ariansyah Achmad',
          autoFocus: true,
          rules: [{
            min: 0,
            message: 'Your name is too short'
          }, {
            required: true,
            message: 'Your full name is required'
          }]
        },
        {
          label: 'Tanggal Lahir ',
          name: 'datebirthday ',
          type: 'date',
          rules: [{
            required: true,
            message: 'Tanggal Lahir is Required'
          }]
        },
        {
          label: 'Jenis Kelamin ',
          name: 'sex',
          type: 'select',
          placeholder: 'Pilih Jenis Kelamin',
          rules: [{
            required: true,
            message: 'Jenis Kelamin is Required'
          }],
          options: [{
            value: 'Laki - Laki',
            label: 'Laki - Laki'
          },
          {
            value: 'Perempuan',
            label: 'Perempuan'
          }]
      },
      {
        label: 'Address ',
        name: 'address',
        type: 'textarea',
        placeholder: 'e.g. Jl. Maulana Yusuf No.3, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115',
        rules: [{
          required: true,
          message: 'Address is Required'
        }]
      },
        {
          label: 'Riwayat Pekerjaan ',
          name: 'riwayat',
          type: 'text',
          multiple: true,
          placeholder: 'eg. PT Maxindo Mitra Solusi, Technical Support, 1 januari 2019 - 1 desember 2019',
          rules: [{
            required: true,
            message: 'riwayat name is required'
          }]
        }],
      
      links: {
    
      },
      submitText: 'Submit',
      onSubmit // will execute after for validated
    }
  ]

  return (
    <LoginLayout {...propsData[0]} />
  )
}



export default Login

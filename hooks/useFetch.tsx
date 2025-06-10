import axios, { AxiosError, AxiosResponse } from 'axios'
import Toast from 'react-native-toast-message'

type HttpMethod = 'POST' | 'GET'

function useFetch() {
  const fetchDataBackend = async <T = any>(
    url: string,
    form: Record<string, any> | null = null,
    method: HttpMethod = 'POST'
  ): Promise<T> => {
    try {
      let response: AxiosResponse<T> | undefined

      if (method === 'POST') {
        response = await axios.post<T>(url, form)
      } else if (method === 'GET') {
        response = await axios.get<T>(url)
      }

      if (response) {
        Toast.show({
          type: 'success',
          text1: (response.data as any)?.msg || 'Operación exitosa',
          position: 'bottom'
        })

        return response.data
      } else {
        throw new Error('No se recibió respuesta del servidor')
      }
    } catch (error) {
      const err = error as AxiosError<{ msg?: string }>
      const errorMsg = err.response?.data?.msg || 'Error desconocido'

      Toast.show({
        type: 'error',
        text1: errorMsg,
        position: 'bottom'
      })

      throw new Error(errorMsg)
    }
  }

  return { fetchDataBackend }
}

export default useFetch

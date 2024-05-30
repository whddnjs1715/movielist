import axios, { AxiosError, Method } from 'axios'
import Service, { CallbackModel, ServiceGetConfigModel, ServicePostConfigModel } from 'service/service'

class API<T> implements Service<T> {
    url = ''

    method: Method | undefined = undefined
  
    config: ServiceGetConfigModel<T> | ServicePostConfigModel<T> = {}
  
    callback: CallbackModel | null = null
  
    customData: any = undefined

    constructor(url: string, method: Method, callback: CallbackModel) {
        this.url = url
        this.method = method
        this.callback = callback
    }    

    async call() {
        await axios({
          url: this.url,
          method: this.method,
          params: this.config.params ? this.config.params : undefined,
          data: this.config.data ? this.config.data : undefined,
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzY0MWYzZWMwZWFkODIyYjgzNWMwYmU2NjFiODdmYSIsInN1YiI6IjY2NTc4YTYwOTkzNjU2ZmRhNzFhMTM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ubbO1huQMDW6IwnBAW6vQ0A5VC3MEmBa1I-7HWlGI0w`
            // Authorization: `Bearer ${process.env.API_KEY}` 
          }
        })
          .then((res) => {
            const data = res.data
            this.callback?.success(data)
          })
          .catch((err: AxiosError) => {
            if (this.callback?.error) {
                this.callback?.error(err)
              }
          })
          .finally(() => {
            if (this.callback?.finally) {
              this.callback.finally()
            }
          })
      }   
  
    set(config: ServiceGetConfigModel<T> | ServicePostConfigModel<T>) {
      this.config = config

      return this
    }

    setUrl(url: string) {
      this.url = url
    }
    
}

export default API

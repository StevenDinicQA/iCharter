import axios, { AxiosError } from "axios";

class ApiService {
  baseUrl: string;

  authToken?: string | null;
  authType?: string | null;

  constructor() {
    this.baseUrl = process.env.BASE_API!;
  }

  constructHeaders(params?: any) {
    return {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        AuthType: this.authType,
      },
      params,
    };
  }

  // NOTE: dont use try catch when calling any method from this class, here is an example use:
  //   const { data, error } = await apiService.get<YourResponseType>('endpointhere');
  //   if (error) do something with eror

  async get<t = any>(endpoint: string, params?: Record<string, any> | null) {
    try {
      const completeUrl = `${this.baseUrl}/${endpoint}`;
      const { data } = await axios.get<t>(
        completeUrl,
        this.constructHeaders(params)
      );

      return {
        data,
      };
    } catch (error: any) {
      const responseData = error.response?.data;
      return {
        error: responseData?.msg || responseData?.message,
        status: error?.response?.status,
      };
    }
  }

  async post<t = any>(
    endpoint: string,
    body: any,
    params?: Record<string, any> | null
  ) {
    try {
      const completeUrl = `${this.baseUrl}/${endpoint}`;
      const { data } = await axios.post<t>(
        completeUrl,
        body,
        this.constructHeaders(params)
      );

      return {
        data,
      };
    } catch (error: any) {
      const responseData = error.response?.data;
      const apiError = responseData?.msg || responseData?.message || "error";
      return { error: apiError, status: error.response.status };
    }
  }

  async put<t = any>(endpoint: string, body?: any) {
    try {
      const completeUrl = `${this.baseUrl}/${endpoint}`;
      const { data } = await axios.put<t>(
        completeUrl,
        body,
        this.constructHeaders()
      );

      return {
        data,
      };
    } catch (error: any) {
      const responseData = error.response?.data;

      return { error: responseData?.msg, status: error.response.status };
    }
  }

  async patch<t = any>(endpoint: string, body?: any) {
    try {
      const completeUrl = `${this.baseUrl}/${endpoint}`;
      const { data } = await axios.patch<t>(
        completeUrl,
        body,
        this.constructHeaders()
      );

      return {
        data,
      };
    } catch (error: any) {

      const responseData = error.response?.data

      return { error: responseData?.message, status: error.response.status };
    }
  }

  async delete<t = any>(endpoint: string) {
    try {
      const completeUrl = `${this.baseUrl}/${endpoint}`;
      const { data } = await axios.delete<t>(
        completeUrl,
        this.constructHeaders()
      );

      return {
        data,
      };
    } catch (error: any) {
      const responseData = error.response.data;
      return { error: responseData?.msg || responseData?.message, status: error.response.status };
    }
  }
}

const apiService = new ApiService();
export default apiService;

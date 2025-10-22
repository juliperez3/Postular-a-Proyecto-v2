"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertTriangle, Building2, Calendar, Clock, BookOpen } from "lucide-react"

// Tipos de datos
interface Universidad {
  id: string
  nombreUniversidad: string
}

interface Proyecto {
  numeroProyecto: string
  nombreProyecto: string
  descripcionProyecto: string
  fechaHoraInicioPostulaciones: string
  fechaHoraCierrePostulaciones: string
  fechaInicioActividades: string
  fechaFinProyecto: string
  nombreEmpresa: string
}

interface Puesto {
  codPuesto: string
  nombrePuesto: string
  descripcionPuesto: string
  horasDedicadas: number
  nombreCarrera: string
  cantMateriasAprobadasReq: number[] // Changed to array to support different requirements per career
  cantMateriasRegularesReq: number[] // Changed to array to support different requirements per career
  cantVacantes: number
}

interface SelectedPuestoWithCarrera {
  puesto: Puesto
  carreraIndex: number
  carreraNombre: string
}

interface SelectedPuestoOnly {
  puesto: Puesto
}

interface ErrorState {
  show: boolean
  message: string
  type: "error" | "success"
}

// Datos mock
const universidades: Universidad[] = [
  { id: "1", nombreUniversidad: "Universidad Tecnológica Nacional - Facultad Regional de Mendoza" },
  { id: "2", nombreUniversidad: "Universidad Nacional de Cuyo" },
  { id: "3", nombreUniversidad: "Universidad de Mendoza" },
  { id: "4", nombreUniversidad: "Universidad Aconcagua" },
  { id: "5", nombreUniversidad: "Universidad de Congreso" },
]

const proyectos: Proyecto[] = [
  {
    numeroProyecto: "PRJ003",
    nombreProyecto: "Sistema de Gestión Empresarial",
    descripcionProyecto: "Desarrollo y Soporte de Aplicaciones Web Corporativas",
    fechaHoraInicioPostulaciones: "2025-10-15T14:30:00",
    fechaHoraCierrePostulaciones: "2025-12-15T23:59:00",
    fechaInicioActividades: "2026-01-15",
    fechaFinProyecto: "2026-06-28",
    nombreEmpresa: "TechCorp Solutions",
  },
  {
    numeroProyecto: "PRJ005",
    nombreProyecto: "Portal de Pacientes",
    descripcionProyecto:
      "Plataforma web que permite a pacientes acceder resultados, gestionar turnos y recibir notificaciones médicas.",
    fechaHoraInicioPostulaciones: "2025-10-18T09:00:00",
    fechaHoraCierrePostulaciones: "2025-11-25T23:59:00",
    fechaInicioActividades: "2025-12-15",
    fechaFinProyecto: "2026-05-30",
    nombreEmpresa: "Innova Salud S.A.",
  },
  {
    numeroProyecto: "PRJ004",
    nombreProyecto: "Monitoreo de Obras",
    descripcionProyecto: "Desarrollo de plataforma digital para monitoriar la gestion de las obras",
    fechaHoraInicioPostulaciones: "2025-10-20T07:00:00",
    fechaHoraCierrePostulaciones: "2025-11-20T23:59:00",
    fechaInicioActividades: "2025-12-20",
    fechaFinProyecto: "2026-05-15",
    nombreEmpresa: "Constructora Andina SRL",
  },
  {
    numeroProyecto: "PRJ006",
    nombreProyecto: "Sistema de Inventario Inteligente",
    descripcionProyecto:
      "Desarrollo de sistema automatizado para gestión de inventarios con análisis predictivo y optimización de stock",
    fechaHoraInicioPostulaciones: "2025-10-22T08:00:00",
    fechaHoraCierrePostulaciones: "2025-12-10T23:59:00",
    fechaInicioActividades: "2026-01-10",
    fechaFinProyecto: "2026-06-15",
    nombreEmpresa: "LogiTech Argentina S.A.",
  },
]

const puestosProyecto1: Puesto[] = [
  {
    codPuesto: "P007",
    nombrePuesto: "Desarrollador/a Full stack",
    descripcionPuesto:
      "Diseña, desarrolla y da soporte a aplicaciones web, asegurando su rendimiento, escalabilidad y continuidad operativa",
    horasDedicadas: 20,
    nombreCarrera: "Ingeniería en Sistemas\nLicenciatura en Informática",
    cantMateriasAprobadasReq: [22, 25], // Different requirements for each career
    cantMateriasRegularesReq: [4, 3], // Different requirements for each career
    cantVacantes: 3,
  },
  {
    codPuesto: "P008",
    nombrePuesto: "Diseñador/a UX/UI",
    descripcionPuesto:
      "Crea interfaces intuitivas y atractivas para la plataforma, mejorando la experiencia en el entorno digital",
    horasDedicadas: 25,
    nombreCarrera: "Diseño Gráfico\nTecnicatura en Programación",
    cantMateriasAprobadasReq: [18, 20], // Different requirements for each career
    cantMateriasRegularesReq: [5, 4], // Different requirements for each career
    cantVacantes: 3,
  },
  {
    codPuesto: "P009",
    nombrePuesto: "Analista de Sistemas",
    descripcionPuesto:
      "Analiza requerimientos del negocio y diseña soluciones tecnológicas eficientes para optimizar procesos empresariales",
    horasDedicadas: 22,
    nombreCarrera: "Ingeniería en Sistemas de Información\nLicenciatura en Informática",
    cantMateriasAprobadasReq: [25, 23], // Different requirements for each career
    cantMateriasRegularesReq: [4, 5], // Different requirements for each career
    cantVacantes: 5,
  },
  {
    codPuesto: "P012",
    nombrePuesto: "Analista de Procesos de Negocio",
    descripcionPuesto:
      "Analiza y optimiza procesos empresariales, identifica oportunidades de mejora y propone soluciones para aumentar la eficiencia operativa",
    horasDedicadas: 20,
    nombreCarrera: "Administración de Empresas\nContador Público",
    cantMateriasAprobadasReq: [20, 22],
    cantMateriasRegularesReq: [5, 4],
    cantVacantes: 2,
  },
  {
    codPuesto: "P013",
    nombrePuesto: "Especialista en Ciberseguridad",
    descripcionPuesto:
      "Implementa medidas de seguridad informática, realiza auditorías de vulnerabilidades y protege la infraestructura tecnológica empresarial",
    horasDedicadas: 25,
    nombreCarrera: "Ingeniería en Sistemas\nLicenciatura en Seguridad Informática",
    cantMateriasAprobadasReq: [24, 21],
    cantMateriasRegularesReq: [3, 5],
    cantVacantes: 2,
  },
]

const puestosProyecto2: Puesto[] = []

const puestosProyecto3: Puesto[] = [
  {
    codPuesto: "P007",
    nombrePuesto: "Desarrollador/a Full stack",
    descripcionPuesto:
      "Diseña, desarrolla y da soporte a aplicaciones web, asegurando su rendimiento, escalabilidad y continuidad operativa",
    horasDedicadas: 20,
    nombreCarrera: "Ingeniería en Sistemas\nLicenciatura en Informática",
    cantMateriasAprobadasReq: [22, 24], // Different requirements for each career
    cantMateriasRegularesReq: [4, 3], // Different requirements for each career
    cantVacantes: 3,
  },
  {
    codPuesto: "P010",
    nombrePuesto: "Especialista en Testing",
    descripcionPuesto:
      "Ejecuta pruebas de software, identifica defectos y garantiza la calidad del producto antes de su implementación",
    horasDedicadas: 18,
    nombreCarrera: "Licenciatura en Informática\nTecnicatura en Programación",
    cantMateriasAprobadasReq: [20, 17], // Different requirements for each career
    cantMateriasRegularesReq: [5, 6], // Different requirements for each career
    cantVacantes: 4,
  },
]

const puestosProyecto4: Puesto[] = [
  {
    codPuesto: "P014",
    nombrePuesto: "Analista de Datos",
    descripcionPuesto:
      "Analiza datos de inventario, genera reportes predictivos y optimiza procesos de gestión de stock mediante análisis estadístico",
    horasDedicadas: 22,
    nombreCarrera: "Ingeniería en Petróleo\nLicenciatura en Geología",
    cantMateriasAprobadasReq: [23, 21], // Different requirements for each career
    cantMateriasRegularesReq: [4, 5], // Different requirements for each career
    cantVacantes: 2,
  },
  {
    codPuesto: "P015",
    nombrePuesto: "Desarrollador/a Backend",
    descripcionPuesto:
      "Desarrolla y mantiene la lógica del servidor, APIs y bases de datos para el sistema de inventario inteligente",
    horasDedicadas: 25,
    nombreCarrera: "Arquitectura\nDiseño Industrial",
    cantMateriasAprobadasReq: [20, 18], // Different requirements for each career
    cantMateriasRegularesReq: [5, 6], // Different requirements for each career
    cantVacantes: 3,
  },
]

const ERROR_MAPPING: Record<string, Record<string, { type: "success" | "error"; message: string }>> = {
  PRJ003: {
    P007: { type: "success", message: "Postulación exitosa al proyecto" },
    P008: {
      type: "error",
      message:
        "No se ha podido completar la postulación al Puesto. El periodo de postulaciones al proyecto Sistema de Gestión Empresarial ha cerrado.",
    },
    P009: {
      type: "error",
      message: "No se ha podido completar la postulación al Puesto. El estudiante se encuentra dado de baja",
    },
    P012: {
      type: "error",
      message:
        "No se ha podido completar la postulación al Puesto. El estudiante no cuenta con la cantidad de materias regulares requeridas",
    },
    P013: {
      type: "error",
      message:
        "No se ha podido completar la postulación al Puesto. El estudiante no cuenta con la cantidad de materias aprobadas requeridas",
    },
  },
  PRJ005: {
    P007: { type: "success", message: "Postulación exitosa al proyecto" },
    P010: {
      type: "error",
      message: "No se ha podido completar la postulación al Puesto. Se ha alcanzado el cupo máximo del puesto",
    },
  },
  PRJ006: {
    P014: {
      type: "error",
      message:
        "No es posible postularse al puesto seleccionado. Usted no cuenta con ninguna carrera habilitada para el Puesto",
    },
    P015: {
      type: "error",
      message:
        "No es posible postularse al puesto seleccionado. Usted no cuenta con ninguna carrera habilitada para el Puesto",
    },
  },
}

export default function PostulacionProyecto() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedUniversidad, setSelectedUniversidad] = useState("1") // Set default university
  const [nroLegajo, setNroLegajo] = useState("12345") // Set default legajo
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null)
  const [selectedPuestoOnly, setSelectedPuestoOnly] = useState<Puesto | null>(null)
  const [selectedPuesto, setSelectedPuesto] = useState<SelectedPuestoWithCarrera | null>(null)
  const [error, setError] = useState<ErrorState>({ show: false, message: "", type: "error" })
  const [loading, setLoading] = useState(false)
  const [hidePortalPacientes, setHidePortalPacientes] = useState(false)

  const showError = (message: string, type: "error" | "success" = "error") => {
    setError({ show: true, message, type })
    setTimeout(() => setError({ show: false, message: "", type: "error" }), 5000)
  }

  const clearError = () => {
    setError({ show: false, message: "", type: "error" })
  }

  const handleLegajoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Permitir escribir cualquier cosa hasta 5 caracteres máximo
    if (value.length <= 5) {
      setNroLegajo(value)
    }
  }

  const validateLegajo = async () => {
    // Validar que no esté vacío
    if (!nroLegajo.trim()) {
      showError("Los datos ingresados no son válidos. Intenta nuevamente.")
      setNroLegajo("") // Limpiar el campo
      return false
    }

    // Validar formato de legajo (solo números, exactamente 5 dígitos)
    const legajoRegex = /^\d{5}$/
    if (!legajoRegex.test(nroLegajo.trim())) {
      showError("Los datos ingresados no son válidos. Intenta nuevamente.")
      setNroLegajo("") // Limpiar el campo
      return false
    }

    setLoading(true)

    // Simulación de validación con sistema académico
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Solo el caso "00000" falla en la validación inicial (estudiante no encontrado)
    if (nroLegajo === "00000") {
      showError("No se ha podido encontrar el Estudiante. Intente nuevamente")
      setNroLegajo("") // Limpiar el campo
      setLoading(false)
      return false
    }

    // Todos los demás casos de prueba pasan la validación inicial
    // Los errores específicos se manejan en handlePostulacion()
    setLoading(false)
    return true
  }

  const handlePostulacion = async (confirmar: boolean) => {
    if (!confirmar) {
      clearError()
      setSelectedPuesto(null)
      setSelectedPuestoOnly(null)
      setCurrentStep(2)
      return
    }

    if (!selectedPuesto || !selectedProyecto) {
      return
    }

    clearError()

    const puesto = selectedPuesto.puesto
    const proyectoNum = selectedProyecto.numeroProyecto
    const puestoCode = puesto.codPuesto

    const errorConfig = ERROR_MAPPING[proyectoNum]?.[puestoCode]

    if (!errorConfig) {
      showError("Error inesperado en la postulación")
      return
    }

    if (errorConfig.type === "error") {
      showError(errorConfig.message)
      return
    }

    // Success case
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    showError(errorConfig.message, "success")

    if (proyectoNum === "PRJ005" && puestoCode === "P007") {
      setHidePortalPacientes(true)
    }

    setCurrentStep(5)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setSelectedUniversidad("1") // Keep default university
    setNroLegajo("12345") // Keep default legajo
    setSelectedProyecto(null)
    setSelectedPuestoOnly(null)
    setSelectedPuesto(null)
    setError({ show: false, message: "", type: "error" })
  }

  const formatDate = (dateString: string, includeTime = true) => {
    const date = new Date(dateString)
    if (includeTime) {
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }
  }

  const getCurrentPuestos = () => {
    if (!selectedProyecto) return []
    if (selectedProyecto.numeroProyecto === "PRJ003") return puestosProyecto1
    if (selectedProyecto.numeroProyecto === "PRJ004") return puestosProyecto2
    if (selectedProyecto.numeroProyecto === "PRJ005") return puestosProyecto3
    if (selectedProyecto.numeroProyecto === "PRJ006") return puestosProyecto4
    return []
  }

  const getVisibleProyectos = () => {
    if (hidePortalPacientes) {
      return proyectos.filter((p) => p.numeroProyecto !== "PRJ005")
    }
    return proyectos
  }

  const handleVerPuestos = () => {
    if (selectedProyecto?.numeroProyecto === "PRJ004") {
      showError("No es posible postularse al Proyecto seleccionado. Usted ya tiene una postulación en curso")
      return
    }
    if (selectedProyecto?.numeroProyecto === "PRJ006") {
      showError(
        "No es posible postularse al Proyecto seleccionado. Usted no cuenta con ninguna carrera habilitada para los Puestos del Proyecto",
      )
      return
    }
    clearError()
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#e8f0f7" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Prácticas Profesionales</h1>
          <p className="text-gray-600">Complete el proceso paso a paso para postularse a un proyecto</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 5 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">Paso {currentStep} de 5</span>
          </div>
        </div>

        {currentStep === 1 && (
          <Card className="w-full bg-white border-gray-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Proyectos Disponibles</CardTitle>
              <CardDescription>Seleccione el proyecto al que desea postularse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getVisibleProyectos().map((proyecto) => (
                <Card
                  key={proyecto.numeroProyecto}
                  className={`cursor-pointer transition-all hover:shadow-md bg-white border-gray-300 ${
                    selectedProyecto?.numeroProyecto === proyecto.numeroProyecto
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedProyecto(proyecto)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{proyecto.nombreProyecto}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Building2 className="w-4 h-4 mr-1" />
                          {proyecto.nombreEmpresa}
                        </p>
                      </div>
                      <Badge variant="outline">{proyecto.numeroProyecto}</Badge>
                    </div>

                    <p className="text-gray-700 mb-3 text-sm">{proyecto.descripcionProyecto}</p>

                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-red-500" />
                        <span>Cierre postulaciones: {formatDate(proyecto.fechaHoraCierrePostulaciones)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-green-500" />
                        <span>Inicio actividades: {formatDate(proyecto.fechaInicioActividades, false)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                        <span>Fin proyecto: {formatDate(proyecto.fechaFinProyecto, false)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {error.show && error.type === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800 text-sm">{error.message}</span>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleVerPuestos}
                  disabled={!selectedProyecto}
                  className={`${
                    selectedProyecto
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                >
                  Ver Puestos
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-blue-800 font-semibold mb-3 text-base">Ejemplos para prueba:</h3>
                <div className="text-blue-700 text-sm space-y-1">
                  <p>
                    • Seleccione "Sistema de Gestión Empresarial" o "Portal de Pacientes" para continuar con la
                    postulación.
                  </p>
                  <p>
                    • Seleccione "Monitoreo de Obras" para simular estudiante cuenta con postulacion en curso al
                    Proyecto.
                  </p>
                  <p>
                    • Seleccione "Sistema de Inventario Inteligente" para simular estudiante no posee ninguna carrera
                    habilitada para los Puestos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Position (without career selection) */}
        {currentStep === 2 && selectedProyecto && (
          <Card className="w-full bg-white border-gray-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Puestos Disponibles</CardTitle>
              <CardDescription>Proyecto: {selectedProyecto.nombreProyecto}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getCurrentPuestos().map((puesto) => (
                <Card
                  key={puesto.codPuesto}
                  className={`cursor-pointer transition-all hover:shadow-md bg-white border-gray-300 ${
                    selectedPuestoOnly?.codPuesto === puesto.codPuesto
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => {
                    clearError()
                    setSelectedPuestoOnly(puesto)
                    setSelectedPuesto(null)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{puesto.nombrePuesto}</h3>
                        <p className="text-sm text-gray-600">{puesto.codPuesto}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {puesto.cantVacantes} vacante{puesto.cantVacantes !== 1 ? "s" : ""}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">{puesto.horasDedicadas}h/semana</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm">{puesto.descripcionPuesto}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent hover:bg-gray-200"
                  onClick={() => {
                    clearError()
                    setCurrentStep(1)
                    setSelectedPuestoOnly(null)
                    setSelectedPuesto(null)
                  }}
                >
                  Atrás
                </Button>
                <Button
                  className={`flex-1 ${
                    selectedPuestoOnly
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                  onClick={() => {
                    clearError()
                    setCurrentStep(3)
                  }}
                  disabled={!selectedPuestoOnly}
                >
                  Ver Requisitos
                </Button>
              </div>

              {selectedProyecto.numeroProyecto === "PRJ005" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-800 font-semibold mb-3 text-base">Ejemplos para prueba:</h3>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>• Seleccione "Desarrollador/a Full stack" para simular última postulación exitosa.</p>
                    <p>• Seleccione "Especialista en Testing" para simular cupo del puesto alcanzado.</p>
                  </div>
                </div>
              )}

              {selectedProyecto.numeroProyecto === "PRJ003" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-800 font-semibold mb-3 text-base">Ejemplos para prueba:</h3>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>• Seleccione "Desarrollador/a Full stack" para simular postulación exitosa.</p>
                    <p>• Seleccione "Diseñador/a UX/UI" para simular postulación fuera de fecha.</p>
                    <p>• Seleccione "Analista de Sistemas" para simular estudiante dado de baja.</p>
                    <p>• Seleccione "Analista de Procesos de Negocio" para simular materias regulares insuficientes.</p>
                    <p>• Seleccione "Especialista en Ciberseguridad" para simular materias aprobadas insuficientes.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Career */}
        {currentStep === 3 && selectedProyecto && selectedPuestoOnly && (
          <Card className="w-full bg-white border-gray-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Requisitos por Carrera</CardTitle>
              <CardDescription>Puesto: {selectedPuestoOnly.nombrePuesto} - Seleccione su carrera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPuestoOnly.nombreCarrera.split("\n").map((carrera, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md bg-white border-2 ${
                    selectedPuesto?.carreraIndex === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    clearError()
                    setSelectedPuesto({
                      puesto: selectedPuestoOnly,
                      carreraIndex: index,
                      carreraNombre: carrera,
                    })
                  }}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">{carrera}</h3>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-blue-800">Mat. Aprobadas:</span>
                        <p className="text-lg font-semibold text-gray-800">
                          Mínimo {selectedPuestoOnly.cantMateriasAprobadasReq[index]}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-green-800">Mat. Regulares:</span>
                        <p className="text-lg font-semibold text-gray-800">
                          Mínimo {selectedPuestoOnly.cantMateriasRegularesReq[index]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent hover:bg-gray-200"
                  onClick={() => {
                    clearError()
                    setCurrentStep(2)
                    setSelectedPuesto(null)
                  }}
                >
                  Atrás
                </Button>
                <Button
                  className={`flex-1 ${
                    selectedPuesto
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                  onClick={() => {
                    clearError()
                    setCurrentStep(4)
                  }}
                  disabled={!selectedPuesto}
                >
                  Postularse
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirm Application */}
        {currentStep === 4 && selectedProyecto && selectedPuesto && (
          <Card className="w-full max-w-2xl mx-auto bg-white border-gray-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>Confirmar Postulación</CardTitle>
              <CardDescription>¿Desea Postularse al puesto seleccionado?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold">Resumen de su postulación:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Proyecto:</span>
                    <p>{selectedProyecto.nombreProyecto}</p>
                  </div>
                  <div>
                    <span className="font-medium">Empresa:</span>
                    <p>{selectedProyecto.nombreEmpresa}</p>
                  </div>
                  <div>
                    <span className="font-medium">Puesto:</span>
                    <p>{selectedPuesto.puesto.nombrePuesto}</p>
                  </div>
                  <div>
                    <span className="font-medium">Carrera:</span>
                    <p>{selectedPuesto.carreraNombre}</p>
                  </div>
                  <div>
                    <span className="font-medium">Dedicación:</span>
                    <p>{selectedPuesto.puesto.horasDedicadas} horas/semana</p>
                  </div>
                  <div>
                    <span className="font-medium">Legajo:</span>
                    <p>{nroLegajo}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Universidad:</span>
                    <p>{universidades.find((u) => u.id === selectedUniversidad)?.nombreUniversidad}</p>
                  </div>
                </div>
              </div>

              {error.show && error.type === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800 text-sm">{error.message}</span>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent hover:bg-gray-200"
                  onClick={() => {
                    handlePostulacion(false)
                  }}
                  disabled={loading}
                >
                  No
                </Button>
                <Button
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
                  onClick={() => {
                    handlePostulacion(true)
                  }}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Sí, Postularme"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Successful Application */}
        {currentStep === 5 && (
          <Card className="w-full max-w-md mx-auto text-center bg-white border-gray-300">
            <CardContent className="p-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">¡Postulación Exitosa!</h2>
              <p className="text-gray-600 mb-6">Su postulación al proyecto ha sido registrada correctamente.</p>
              <Button onClick={resetForm} className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                Nueva Postulación
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

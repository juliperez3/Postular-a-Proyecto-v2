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
  cantMateriasAprobadasReq: number
  cantMateriasRegularesReq: number
  cantVacantes: number
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
    numeroProyecto: "PRJ004",
    nombreProyecto: "Monitoreo de Obras",
    descripcionProyecto: "Desarrollo de plataforma digital para monitoriar la gestion de las obras",
    fechaHoraInicioPostulaciones: "2025-10-20T07:00:00",
    fechaHoraCierrePostulaciones: "2025-11-20T23:59:00",
    fechaInicioActividades: "2025-12-20",
    fechaFinProyecto: "2026-05-15",
    nombreEmpresa: "Constructora Andina SRL",
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
    cantMateriasAprobadasReq: 22,
    cantMateriasRegularesReq: 4,
    cantVacantes: 3,
  },
  {
    codPuesto: "P008",
    nombrePuesto: "Diseñador/a UX/UI",
    descripcionPuesto:
      "Crea interfaces intuitivas y atractivas para la plataforma, mejorando la experiencia en el entorno digital",
    horasDedicadas: 25,
    nombreCarrera: "Diseño Gráfico\nTecnicatura en Programación",
    cantMateriasAprobadasReq: 23,
    cantMateriasRegularesReq: 5,
    cantVacantes: 3,
  },
  {
    codPuesto: "P009",
    nombrePuesto: "Analista de Sistemas",
    descripcionPuesto:
      "Analiza requerimientos del negocio y diseña soluciones tecnológicas eficientes para optimizar procesos empresariales",
    horasDedicadas: 22,
    nombreCarrera: "Ingeniería en Sistemas de Información\nLicenciatura en Informática",
    cantMateriasAprobadasReq: 25,
    cantMateriasRegularesReq: 4,
    cantVacantes: 5,
  },
  {
    codPuesto: "P010",
    nombrePuesto: "Especialista en Testing",
    descripcionPuesto:
      "Ejecuta pruebas de software, identifica defectos y garantiza la calidad del producto antes de su implementación",
    horasDedicadas: 18,
    nombreCarrera: "Licenciatura en Informática\nTecnicatura en Programación",
    cantMateriasAprobadasReq: 20,
    cantMateriasRegularesReq: 5,
    cantVacantes: 4,
  },
]

const puestosProyecto2: Puesto[] = [
  {
    codPuesto: "P005",
    nombrePuesto: "Jefe/a de Obra",
    descripcionPuesto:
      "Supervisa y coordina la ejecución de proyectos de construcción, asegurando calidad, plazos, costos y cumplimiento de normas de seguridad",
    horasDedicadas: 30,
    nombreCarrera: "Ingeniería Civil\nIngeniería Industrial",
    cantMateriasAprobadasReq: 24,
    cantMateriasRegularesReq: 5,
    cantVacantes: 3,
  },
  {
    codPuesto: "P007",
    nombrePuesto: "Desarrollador/a Full stack",
    descripcionPuesto:
      "Diseña, desarrolla y da soporte a aplicaciones web, asegurando su rendimiento, escalabilidad y continuidad operativa",
    horasDedicadas: 20,
    nombreCarrera: "Ingeniería en Sistemas\nTecnicatura en Programación",
    cantMateriasAprobadasReq: 21,
    cantMateriasRegularesReq: 4,
    cantVacantes: 3,
  },
  {
    codPuesto: "P011",
    nombrePuesto: "Técnico/a en Seguridad e Higiene",
    descripcionPuesto:
      "Implementa y supervisa protocolos de seguridad en obra, realiza inspecciones y capacita al personal en prevención de riesgos laborales",
    horasDedicadas: 25,
    nombreCarrera: "Licenciatura en Trabajo Social\nIngeniería Industrial",
    cantMateriasAprobadasReq: 20,
    cantMateriasRegularesReq: 5,
    cantVacantes: 6,
  },
  {
    codPuesto: "P013",
    nombrePuesto: "Analista de Costos",
    descripcionPuesto:
      "Analiza y controla los costos de construcción, elabora presupuestos detallados y realiza seguimiento financiero de los proyectos",
    horasDedicadas: 22,
    nombreCarrera: "Licenciatura en Administración\nContador Público",
    cantMateriasAprobadasReq: 25,
    cantMateriasRegularesReq: 4,
    cantVacantes: 4,
  },
]

export default function PostulacionProyecto() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedUniversidad, setSelectedUniversidad] = useState("1") // Set default university
  const [nroLegajo, setNroLegajo] = useState("12345") // Set default legajo
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | null>(null)
  const [selectedPuesto, setSelectedPuesto] = useState<Puesto | null>(null)
  const [error, setError] = useState<ErrorState>({ show: false, message: "", type: "error" })
  const [loading, setLoading] = useState(false)

  const showError = (message: string, type: "error" | "success" = "error") => {
    setError({ show: true, message, type })
    setTimeout(() => setError({ show: false, message: "", type: "error" }), 5000)
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
      setCurrentStep(2) // Volver a selección de puestos
      return
    }

    if (!selectedPuesto) {
      return
    }

    if (selectedProyecto?.numeroProyecto === "PRJ003") {
      if (selectedPuesto.codPuesto === "P007") {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setLoading(false)
        showError("Postulación exitosa al proyecto", "success")
        setCurrentStep(4)
        return
      }

      if (selectedPuesto.codPuesto === "P008") {
        showError(
          "No es posible postularse al Puesto seleccionado. Usted no cuenta con ninguna carrera habilitada para el Puesto",
        )
        return false
      }

      if (selectedPuesto.codPuesto === "P009") {
        showError(
          `No se ha podido completar la postulación al Puesto. El periodo de postulaciones al proyecto ${selectedProyecto?.nombreProyecto} ha cerrado.`,
        )
        return false
      }

      if (selectedPuesto.codPuesto === "P010") {
        showError(
          "No se ha podido completar la postulación al Puesto. Se ha superado el número máximo de postulaciones",
        )
        return false
      }
    }

    if (selectedProyecto?.numeroProyecto === "PRJ004") {
      if (selectedPuesto.codPuesto === "P005") {
        showError("No se ha podido completar la postulación al Puesto. Usted ya se encuentra postulado al Proyecto")
        return false
      }

      if (selectedPuesto.codPuesto === "P007") {
        showError("No se ha podido completar la postulación al Puesto. El estudiante se encuentra dado de baja")
        return false
      }

      if (selectedPuesto.codPuesto === "P011") {
        showError(
          "No se ha podido completar la postulación al Puesto. El estudiante no cuenta con la cantidad de materias regulares requeridas",
        )
        return false
      }

      if (selectedPuesto.codPuesto === "P013") {
        showError(
          "No se ha podido completar la postulación al Puesto. El estudiante no cuenta con la cantidad de materias aprobadas requeridas",
        )
        return false
      }
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)

    showError("Postulación exitosa al proyecto", "success")

    setCurrentStep(4) // Updated to step 4 (success screen)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setSelectedUniversidad("1") // Keep default university
    setNroLegajo("12345") // Keep default legajo
    setSelectedProyecto(null)
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
    return selectedProyecto.numeroProyecto === "PRJ003" ? puestosProyecto1 : puestosProyecto2
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Prácticas Profesionales</h1>
          <p className="text-gray-600">Complete el proceso paso a paso para postularse a un proyecto</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">Paso {currentStep} de 4</span>
          </div>
        </div>

        {currentStep === 1 && (
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Proyectos Disponibles</CardTitle>
              <CardDescription>Seleccione el proyecto al que desea postularse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proyectos.map((proyecto) => (
                <Card
                  key={proyecto.numeroProyecto}
                  className={`cursor-pointer transition-all hover:shadow-md ${
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

              <div className="flex justify-end pt-4">
                <Button onClick={() => setCurrentStep(2)} disabled={!selectedProyecto}>
                  Ver Puestos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && selectedProyecto && (
          <Card className="w-full">
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
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPuesto?.codPuesto === puesto.codPuesto ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedPuesto(puesto)}
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

                    <p className="text-gray-700 mb-3 text-sm">{puesto.descripcionPuesto}</p>

                    <Separator className="my-3" />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Requisitos:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Carrera:</span>
                          <br />
                          {puesto.nombreCarrera.split("\n").map((carrera, index) => (
                            <div key={index}>{carrera}</div>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Mat. Aprobadas:</span>
                          <br />
                          Mínimo {puesto.cantMateriasAprobadasReq}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Mat. Regulares:</span>
                          <br />
                          Mínimo {puesto.cantMateriasRegularesReq}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(1)}>
                  Atrás
                </Button>
                <Button className="flex-1" onClick={() => setCurrentStep(3)} disabled={!selectedPuesto}>
                  Postularse
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-blue-800 font-semibold mb-3 text-base">Ejemplos para prueba:</h3>
                <div className="text-blue-700 text-sm space-y-1">
                  {selectedProyecto.numeroProyecto === "PRJ003" ? (
                    <>
                      <p>• Seleccione "Desarrollador/a Full stack" para simular postulación exitosa.</p>
                      <p>
                        • Seleccione "Diseñador/a UX/UI" para simular estudiante no posee ninguna carrera habilitada
                        para el Puesto.
                      </p>
                      <p>• Seleccione "Analista de Sistemas" para simular postulación fuera de fecha.</p>
                      <p>• Seleccione "Especialista en Testing" para simular cupo del puesto alcanzado.</p>
                    </>
                  ) : (
                    <>
                      <p>• Seleccione "Jefe/a de Obra" para simular postulación existente.</p>
                      <p>• Seleccione "Desarrollador/a Full stack" para simular estudiante dado de baja.</p>
                      <p>
                        • Seleccione "Técnico/a en Seguridad e Higiene" para simular materias regulares insuficientes.
                      </p>
                      <p>• Seleccione "Analista de Costos" para simular materias aprobadas insuficientes.</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && selectedProyecto && selectedPuesto && (
          <Card className="w-full max-w-2xl mx-auto">
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
                    <p>{selectedPuesto.nombrePuesto}</p>
                  </div>
                  <div>
                    <span className="font-medium">Dedicación:</span>
                    <p>{selectedPuesto.horasDedicadas} horas/semana</p>
                  </div>
                  <div>
                    <span className="font-medium">Legajo:</span>
                    <p>{nroLegajo}</p>
                  </div>
                  <div>
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
                  className="flex-1 bg-transparent"
                  onClick={() => handlePostulacion(false)}
                  disabled={loading}
                >
                  No
                </Button>
                <Button className="flex-1" onClick={() => handlePostulacion(true)} disabled={loading}>
                  {loading ? "Procesando..." : "Sí, Postularme"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="w-full max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">¡Postulación Exitosa!</h2>
              <p className="text-gray-600 mb-6">Su postulación al proyecto ha sido registrada correctamente.</p>
              <Button onClick={resetForm} className="w-full">
                Nueva Postulación
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

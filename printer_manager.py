"""
Sistema de Gestión de Impresoras
Implementa el principio ISP (Interface Segregation Principle) para diferentes tipos de impresoras.

Autor: JADOS Team
Fecha: 8 de Agosto, 2025
Versión: 1.0

Descripción:
Este sistema permite gestionar diferentes tipos de impresoras con capacidades variadas:
- Impresoras básicas (solo blanco y negro)
- Impresoras a color
- Impresoras multifunción (imprimir, escanear, enviar fax)

El código aplica el Principio de Segregación de Interfaces (ISP) para evitar que las clases
dependan de interfaces que no utilizan.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Optional
from enum import Enum
import datetime


class PrintColor(Enum):
    """Enumeración para los colores de impresión disponibles"""
    BLACK = "negro"
    WHITE = "blanco"
    RED = "rojo"
    BLUE = "azul"
    GREEN = "verde"
    YELLOW = "amarillo"
    CYAN = "cian"
    MAGENTA = "magenta"


class DocumentFormat(Enum):
    """Formatos de documento soportados"""
    PDF = "pdf"
    DOC = "doc"
    DOCX = "docx"
    TXT = "txt"
    JPG = "jpg"
    PNG = "png"


# ============================================================================
# INTERFACES SEGREGADAS (Aplicando ISP)
# ============================================================================

class IPrintable(ABC):
    """Interface básica para capacidad de impresión"""
    
    @abstractmethod
    def print_document(self, document: str, copies: int = 1) -> bool:
        """
        Imprime un documento
        
        Args:
            document (str): Ruta o contenido del documento
            copies (int): Número de copias a imprimir
            
        Returns:
            bool: True si la impresión fue exitosa, False en caso contrario
        """
        pass


class IColorPrintable(ABC):
    """Interface para impresión a color"""
    
    @abstractmethod
    def print_color_document(self, document: str, colors: List[PrintColor], copies: int = 1) -> bool:
        """
        Imprime un documento a color
        
        Args:
            document (str): Ruta o contenido del documento
            colors (List[PrintColor]): Colores a utilizar
            copies (int): Número de copias
            
        Returns:
            bool: True si la impresión fue exitosa
        """
        pass


class IScannable(ABC):
    """Interface para capacidad de escaneo"""
    
    @abstractmethod
    def scan_document(self, resolution: int = 300, color_mode: bool = True) -> str:
        """
        Escanea un documento
        
        Args:
            resolution (int): Resolución en DPI
            color_mode (bool): True para color, False para blanco y negro
            
        Returns:
            str: Ruta del archivo escaneado
        """
        pass


class IFaxable(ABC):
    """Interface para capacidad de envío de fax"""
    
    @abstractmethod
    def send_fax(self, document: str, phone_number: str) -> bool:
        """
        Envía un documento por fax
        
        Args:
            document (str): Ruta del documento
            phone_number (str): Número de teléfono destino
            
        Returns:
            bool: True si el fax se envió correctamente
        """
        pass


# ============================================================================
# CLASES DE IMPRESORAS IMPLEMENTANDO LAS INTERFACES
# ============================================================================

class BasicPrinter(IPrintable):
    """
    Impresora básica que solo imprime en blanco y negro
    
    Esta clase implementa únicamente la interface IPrintable ya que solo
    tiene capacidad de impresión básica en blanco y negro.
    """
    
    def __init__(self, printer_id: str, model: str):
        """
        Inicializa una impresora básica
        
        Args:
            printer_id (str): Identificador único de la impresora
            model (str): Modelo de la impresora
        """
        self.printer_id = printer_id
        self.model = model
        self.is_online = True
        self.paper_level = 100  # Porcentaje de papel disponible
        self.ink_level = {"black": 100}  # Solo tinta negra
        self.print_history: List[Dict] = []
    
    def print_document(self, document: str, copies: int = 1) -> bool:
        """
        Imprime un documento en blanco y negro
        
        Args:
            document (str): Ruta o contenido del documento
            copies (int): Número de copias a imprimir
            
        Returns:
            bool: True si la impresión fue exitosa
        """
        if not self.is_online:
            print(f"Error: La impresora {self.printer_id} está fuera de línea")
            return False
        
        if self.paper_level < copies * 2:  # Estimación de papel necesario
            print(f"Error: Papel insuficiente en {self.printer_id}")
            return False
        
        if self.ink_level["black"] < copies * 5:  # Estimación de tinta necesaria
            print(f"Error: Tinta negra insuficiente en {self.printer_id}")
            return False
        
        # Simular impresión
        print(f"📄 Imprimiendo documento '{document}' en {self.model}")
        print(f"   └─ Copias: {copies}")
        print(f"   └─ Modo: Blanco y Negro")
        
        # Actualizar recursos
        self.paper_level -= copies * 2
        self.ink_level["black"] -= copies * 5
        
        # Registrar en historial
        self._add_to_history("print", document, copies, ["black"])
        
        print(f"✅ Impresión completada en {self.printer_id}")
        return True
    
    def get_status(self) -> Dict:
        """Retorna el estado actual de la impresora"""
        return {
            "printer_id": self.printer_id,
            "model": self.model,
            "online": self.is_online,
            "paper_level": self.paper_level,
            "ink_levels": self.ink_level,
            "capabilities": ["print_bw"]
        }
    
    def _add_to_history(self, action: str, document: str, copies: int, colors: List[str]):
        """Agrega una acción al historial"""
        self.print_history.append({
            "timestamp": datetime.datetime.now(),
            "action": action,
            "document": document,
            "copies": copies,
            "colors": colors
        })


class ColorPrinter(IPrintable, IColorPrintable):
    """
    Impresora a color que puede imprimir tanto en blanco y negro como a color
    
    Implementa tanto IPrintable como IColorPrintable para dar soporte
    completo de impresión.
    """
    
    def __init__(self, printer_id: str, model: str):
        """
        Inicializa una impresora a color
        
        Args:
            printer_id (str): Identificador único de la impresora
            model (str): Modelo de la impresora
        """
        self.printer_id = printer_id
        self.model = model
        self.is_online = True
        self.paper_level = 100
        self.ink_level = {
            "black": 100,
            "cyan": 100,
            "magenta": 100,
            "yellow": 100
        }
        self.print_history: List[Dict] = []
    
    def print_document(self, document: str, copies: int = 1) -> bool:
        """
        Imprime un documento en blanco y negro (modo básico)
        
        Args:
            document (str): Ruta o contenido del documento
            copies (int): Número de copias a imprimir
            
        Returns:
            bool: True si la impresión fue exitosa
        """
        return self._execute_print(document, copies, [PrintColor.BLACK])
    
    def print_color_document(self, document: str, colors: List[PrintColor], copies: int = 1) -> bool:
        """
        Imprime un documento a color
        
        Args:
            document (str): Ruta o contenido del documento
            colors (List[PrintColor]): Colores a utilizar
            copies (int): Número de copias
            
        Returns:
            bool: True si la impresión fue exitosa
        """
        return self._execute_print(document, copies, colors)
    
    def _execute_print(self, document: str, copies: int, colors: List[PrintColor]) -> bool:
        """Ejecuta la impresión con los parámetros especificados"""
        if not self.is_online:
            print(f"Error: La impresora {self.printer_id} está fuera de línea")
            return False
        
        if self.paper_level < copies * 2:
            print(f"Error: Papel insuficiente en {self.printer_id}")
            return False
        
        # Verificar niveles de tinta según colores requeridos
        ink_needed = self._calculate_ink_needed(colors, copies)
        for color, needed in ink_needed.items():
            if self.ink_level.get(color, 0) < needed:
                print(f"Error: Tinta {color} insuficiente en {self.printer_id}")
                return False
        
        # Simular impresión
        color_names = [color.value for color in colors]
        print(f"🎨 Imprimiendo documento '{document}' en {self.model}")
        print(f"   └─ Copias: {copies}")
        print(f"   └─ Colores: {', '.join(color_names)}")
        
        # Actualizar recursos
        self.paper_level -= copies * 2
        for color, needed in ink_needed.items():
            self.ink_level[color] -= needed
        
        # Registrar en historial
        self._add_to_history("print_color", document, copies, color_names)
        
        print(f"✅ Impresión a color completada en {self.printer_id}")
        return True
    
    def _calculate_ink_needed(self, colors: List[PrintColor], copies: int) -> Dict[str, int]:
        """Calcula la tinta necesaria según los colores"""
        ink_map = {
            PrintColor.BLACK: "black",
            PrintColor.CYAN: "cyan",
            PrintColor.MAGENTA: "magenta",
            PrintColor.YELLOW: "yellow",
            PrintColor.RED: ["magenta", "yellow"],  # Mezcla
            PrintColor.GREEN: ["cyan", "yellow"],   # Mezcla
            PrintColor.BLUE: ["cyan", "magenta"]    # Mezcla
        }
        
        needed = {"black": 0, "cyan": 0, "magenta": 0, "yellow": 0}
        
        for color in colors:
            if color in ink_map:
                ink_colors = ink_map[color]
                if isinstance(ink_colors, str):
                    needed[ink_colors] += copies * 3
                else:
                    for ink_color in ink_colors:
                        needed[ink_color] += copies * 2
        
        return needed
    
    def get_status(self) -> Dict:
        """Retorna el estado actual de la impresora"""
        return {
            "printer_id": self.printer_id,
            "model": self.model,
            "online": self.is_online,
            "paper_level": self.paper_level,
            "ink_levels": self.ink_level,
            "capabilities": ["print_bw", "print_color"]
        }
    
    def _add_to_history(self, action: str, document: str, copies: int, colors: List[str]):
        """Agrega una acción al historial"""
        self.print_history.append({
            "timestamp": datetime.datetime.now(),
            "action": action,
            "document": document,
            "copies": copies,
            "colors": colors
        })


class MultiFunctionPrinter(IPrintable, IColorPrintable, IScannable, IFaxable):
    """
    Impresora multifunción con capacidades completas:
    - Impresión en blanco y negro
    - Impresión a color
    - Escaneo
    - Envío de fax
    
    Esta clase implementa todas las interfaces disponibles ya que es una
    impresora con todas las funcionalidades.
    """
    
    def __init__(self, printer_id: str, model: str):
        """
        Inicializa una impresora multifunción
        
        Args:
            printer_id (str): Identificador único de la impresora
            model (str): Modelo de la impresora
        """
        self.printer_id = printer_id
        self.model = model
        self.is_online = True
        self.paper_level = 100
        self.ink_level = {
            "black": 100,
            "cyan": 100,
            "magenta": 100,
            "yellow": 100
        }
        self.scanner_available = True
        self.fax_available = True
        self.operation_history: List[Dict] = []
    
    def print_document(self, document: str, copies: int = 1) -> bool:
        """Imprime documento en blanco y negro"""
        return self._execute_print(document, copies, [PrintColor.BLACK])
    
    def print_color_document(self, document: str, colors: List[PrintColor], copies: int = 1) -> bool:
        """Imprime documento a color"""
        return self._execute_print(document, copies, colors)
    
    def _execute_print(self, document: str, copies: int, colors: List[PrintColor]) -> bool:
        """Método interno para ejecutar impresión"""
        if not self.is_online:
            print(f"Error: La impresora {self.printer_id} está fuera de línea")
            return False
        
        if self.paper_level < copies * 2:
            print(f"Error: Papel insuficiente en {self.printer_id}")
            return False
        
        # Simular impresión
        color_names = [color.value for color in colors]
        print(f"🖨️ Imprimiendo documento '{document}' en {self.model}")
        print(f"   └─ Copias: {copies}")
        print(f"   └─ Colores: {', '.join(color_names)}")
        
        self.paper_level -= copies * 2
        self._add_to_history("print", document, {"copies": copies, "colors": color_names})
        
        print(f"✅ Impresión completada en {self.printer_id}")
        return True
    
    def scan_document(self, resolution: int = 300, color_mode: bool = True) -> str:
        """
        Escanea un documento
        
        Args:
            resolution (int): Resolución en DPI (300, 600, 1200)
            color_mode (bool): True para color, False para escala de grises
            
        Returns:
            str: Ruta del archivo escaneado o mensaje de error
        """
        if not self.is_online:
            return f"Error: La impresora {self.printer_id} está fuera de línea"
        
        if not self.scanner_available:
            return f"Error: El escáner de {self.printer_id} no está disponible"
        
        # Simular escaneo
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        mode = "color" if color_mode else "grayscale"
        filename = f"scan_{timestamp}_{resolution}dpi_{mode}.pdf"
        
        print(f"📷 Escaneando documento en {self.model}")
        print(f"   └─ Resolución: {resolution} DPI")
        print(f"   └─ Modo: {'Color' if color_mode else 'Escala de grises'}")
        print(f"   └─ Archivo: {filename}")
        
        self._add_to_history("scan", filename, {"resolution": resolution, "color_mode": color_mode})
        
        print(f"✅ Escaneo completado: {filename}")
        return filename
    
    def send_fax(self, document: str, phone_number: str) -> bool:
        """
        Envía un documento por fax
        
        Args:
            document (str): Ruta del documento a enviar
            phone_number (str): Número de teléfono destino
            
        Returns:
            bool: True si el fax se envió correctamente
        """
        if not self.is_online:
            print(f"Error: La impresora {self.printer_id} está fuera de línea")
            return False
        
        if not self.fax_available:
            print(f"Error: El fax de {self.printer_id} no está disponible")
            return False
        
        # Validar número de teléfono (simple validación)
        if not phone_number.replace("+", "").replace("-", "").replace(" ", "").isdigit():
            print(f"Error: Número de teléfono inválido: {phone_number}")
            return False
        
        # Simular envío de fax
        print(f"📠 Enviando fax desde {self.model}")
        print(f"   └─ Documento: {document}")
        print(f"   └─ Destino: {phone_number}")
        
        self._add_to_history("fax", document, {"phone_number": phone_number})
        
        print(f"✅ Fax enviado correctamente a {phone_number}")
        return True
    
    def get_status(self) -> Dict:
        """Retorna el estado completo de la impresora multifunción"""
        return {
            "printer_id": self.printer_id,
            "model": self.model,
            "online": self.is_online,
            "paper_level": self.paper_level,
            "ink_levels": self.ink_level,
            "scanner_available": self.scanner_available,
            "fax_available": self.fax_available,
            "capabilities": ["print_bw", "print_color", "scan", "fax"]
        }
    
    def _add_to_history(self, action: str, target: str, details: Dict):
        """Agrega una operación al historial"""
        self.operation_history.append({
            "timestamp": datetime.datetime.now(),
            "action": action,
            "target": target,
            "details": details
        })


# ============================================================================
# GESTOR DE IMPRESORAS
# ============================================================================

class PrinterManager:
    """
    Gestor centralizado de impresoras que permite administrar múltiples
    dispositivos de diferentes tipos aplicando el principio ISP.
    """
    
    def __init__(self):
        """Inicializa el gestor de impresoras"""
        self.printers: Dict[str, IPrintable] = {}
        self.default_printer: Optional[str] = None
    
    def add_printer(self, printer: IPrintable) -> bool:
        """
        Agrega una impresora al gestor
        
        Args:
            printer (IPrintable): Instancia de impresora que implementa IPrintable
            
        Returns:
            bool: True si se agregó correctamente
        """
        if hasattr(printer, 'printer_id'):
            if printer.printer_id in self.printers:
                print(f"⚠️ La impresora {printer.printer_id} ya existe")
                return False
            
            self.printers[printer.printer_id] = printer
            
            # Si es la primera impresora, establecerla como predeterminada
            if not self.default_printer:
                self.default_printer = printer.printer_id
            
            print(f"✅ Impresora {printer.printer_id} agregada al sistema")
            return True
        else:
            print("❌ Error: La impresora debe tener un printer_id")
            return False
    
    def remove_printer(self, printer_id: str) -> bool:
        """Remueve una impresora del gestor"""
        if printer_id in self.printers:
            del self.printers[printer_id]
            if self.default_printer == printer_id:
                self.default_printer = next(iter(self.printers), None)
            print(f"✅ Impresora {printer_id} removida del sistema")
            return True
        else:
            print(f"❌ Impresora {printer_id} no encontrada")
            return False
    
    def set_default_printer(self, printer_id: str) -> bool:
        """Establece la impresora predeterminada"""
        if printer_id in self.printers:
            self.default_printer = printer_id
            print(f"✅ Impresora predeterminada: {printer_id}")
            return True
        else:
            print(f"❌ Impresora {printer_id} no encontrada")
            return False
    
    def print_document(self, document: str, printer_id: Optional[str] = None, copies: int = 1) -> bool:
        """
        Imprime un documento usando la impresora especificada o la predeterminada
        
        Args:
            document (str): Documento a imprimir
            printer_id (Optional[str]): ID de impresora específica
            copies (int): Número de copias
            
        Returns:
            bool: True si la impresión fue exitosa
        """
        target_printer = printer_id or self.default_printer
        
        if not target_printer or target_printer not in self.printers:
            print("❌ No hay impresora disponible para imprimir")
            return False
        
        return self.printers[target_printer].print_document(document, copies)
    
    def print_color_document(self, document: str, colors: List[PrintColor], 
                           printer_id: Optional[str] = None, copies: int = 1) -> bool:
        """Imprime un documento a color si la impresora lo soporta"""
        target_printer = printer_id or self.default_printer
        
        if not target_printer or target_printer not in self.printers:
            print("❌ No hay impresora disponible para imprimir")
            return False
        
        printer = self.printers[target_printer]
        
        if isinstance(printer, IColorPrintable):
            return printer.print_color_document(document, colors, copies)
        else:
            print(f"❌ La impresora {target_printer} no soporta impresión a color")
            return False
    
    def scan_document(self, printer_id: Optional[str] = None, 
                     resolution: int = 300, color_mode: bool = True) -> Optional[str]:
        """Escanea un documento si la impresora lo soporta"""
        target_printer = printer_id or self.default_printer
        
        if not target_printer or target_printer not in self.printers:
            print("❌ No hay impresora disponible para escanear")
            return None
        
        printer = self.printers[target_printer]
        
        if isinstance(printer, IScannable):
            return printer.scan_document(resolution, color_mode)
        else:
            print(f"❌ La impresora {target_printer} no soporta escaneo")
            return None
    
    def send_fax(self, document: str, phone_number: str, 
                printer_id: Optional[str] = None) -> bool:
        """Envía un fax si la impresora lo soporta"""
        target_printer = printer_id or self.default_printer
        
        if not target_printer or target_printer not in self.printers:
            print("❌ No hay impresora disponible para enviar fax")
            return False
        
        printer = self.printers[target_printer]
        
        if isinstance(printer, IFaxable):
            return printer.send_fax(document, phone_number)
        else:
            print(f"❌ La impresora {target_printer} no soporta envío de fax")
            return False
    
    def list_printers(self) -> Dict[str, Dict]:
        """Lista todas las impresoras y sus capacidades"""
        printers_info = {}
        
        for printer_id, printer in self.printers.items():
            if hasattr(printer, 'get_status'):
                printers_info[printer_id] = printer.get_status()
            else:
                printers_info[printer_id] = {
                    "printer_id": printer_id,
                    "type": type(printer).__name__,
                    "capabilities": self._get_capabilities(printer)
                }
        
        return printers_info
    
    def _get_capabilities(self, printer: IPrintable) -> List[str]:
        """Determina las capacidades de una impresora"""
        capabilities = ["print_bw"]
        
        if isinstance(printer, IColorPrintable):
            capabilities.append("print_color")
        if isinstance(printer, IScannable):
            capabilities.append("scan")
        if isinstance(printer, IFaxable):
            capabilities.append("fax")
        
        return capabilities
    
    def get_printer_by_capability(self, capability: str) -> List[str]:
        """Retorna las impresoras que tienen una capacidad específica"""
        capable_printers = []
        
        for printer_id, printer in self.printers.items():
            if capability == "print" and isinstance(printer, IPrintable):
                capable_printers.append(printer_id)
            elif capability == "color" and isinstance(printer, IColorPrintable):
                capable_printers.append(printer_id)
            elif capability == "scan" and isinstance(printer, IScannable):
                capable_printers.append(printer_id)
            elif capability == "fax" and isinstance(printer, IFaxable):
                capable_printers.append(printer_id)
        
        return capable_printers


# ============================================================================
# FUNCIÓN PRINCIPAL DE DEMOSTRACIÓN
# ============================================================================

def main():
    """
    Función principal que demuestra el uso del sistema de gestión de impresoras
    aplicando el Principio de Segregación de Interfaces (ISP)
    """
    print("=" * 80)
    print("🖨️  SISTEMA DE GESTIÓN DE IMPRESORAS - DEMO")
    print("   Aplicando el Principio de Segregación de Interfaces (ISP)")
    print("=" * 80)
    
    # Crear el gestor de impresoras
    manager = PrinterManager()
    
    # Crear diferentes tipos de impresoras
    print("\n📦 Creando impresoras...")
    
    # 1. Impresora básica (solo blanco y negro)
    basic_printer = BasicPrinter("HP-001", "HP LaserJet Pro")
    manager.add_printer(basic_printer)
    
    # 2. Impresora a color
    color_printer = ColorPrinter("CANON-002", "Canon PIXMA Color")
    manager.add_printer(color_printer)
    
    # 3. Impresora multifunción
    multifunction = MultiFunctionPrinter("EPSON-003", "Epson WorkForce Pro")
    manager.add_printer(multifunction)
    
    # Mostrar impresoras disponibles
    print("\n📋 Impresoras registradas:")
    printers_info = manager.list_printers()
    for printer_id, info in printers_info.items():
        print(f"   • {printer_id}: {info.get('model', 'N/A')}")
        print(f"     └─ Capacidades: {', '.join(info.get('capabilities', []))}")
    
    print("\n" + "="*50)
    print("🧪 PRUEBAS DE FUNCIONALIDAD")
    print("="*50)
    
    # Prueba 1: Impresión básica
    print("\n1️⃣ Prueba de impresión básica:")
    manager.print_document("documento_importante.pdf", copies=2)
    
    # Prueba 2: Impresión a color (solo impresoras compatibles)
    print("\n2️⃣ Prueba de impresión a color:")
    colors = [PrintColor.RED, PrintColor.BLUE, PrintColor.BLACK]
    manager.print_color_document("presentacion.pptx", colors, "CANON-002", copies=1)
    
    # Prueba 3: Intento de impresión a color en impresora básica
    print("\n3️⃣ Intento de impresión a color en impresora básica:")
    manager.print_color_document("imagen.jpg", colors, "HP-001")
    
    # Prueba 4: Escaneo (solo multifunción)
    print("\n4️⃣ Prueba de escaneo:")
    scanned_file = manager.scan_document("EPSON-003", resolution=600, color_mode=True)
    
    # Prueba 5: Intento de escaneo en impresora básica
    print("\n5️⃣ Intento de escaneo en impresora básica:")
    manager.scan_document("HP-001")
    
    # Prueba 6: Envío de fax (solo multifunción)
    print("\n6️⃣ Prueba de envío de fax:")
    manager.send_fax("contrato.pdf", "+1-555-123-4567", "EPSON-003")
    
    # Prueba 7: Consulta de impresoras por capacidad
    print("\n7️⃣ Consulta de impresoras por capacidad:")
    color_printers = manager.get_printer_by_capability("color")
    scan_printers = manager.get_printer_by_capability("scan")
    fax_printers = manager.get_printer_by_capability("fax")
    
    print(f"   • Impresoras con capacidad de color: {color_printers}")
    print(f"   • Impresoras con capacidad de escaneo: {scan_printers}")
    print(f"   • Impresoras con capacidad de fax: {fax_printers}")
    
    print("\n" + "="*50)
    print("✅ BENEFICIOS DEL PRINCIPIO ISP DEMOSTRADOS:")
    print("="*50)
    print("1. ✓ Las clases solo implementan las interfaces que necesitan")
    print("2. ✓ No hay métodos vacíos o no implementados")
    print("3. ✓ Cada impresora tiene solo las responsabilidades que puede cumplir")
    print("4. ✓ Fácil extensión para nuevos tipos de impresoras")
    print("5. ✓ Código más mantenible y menos acoplado")
    print("6. ✓ Cumple con el principio de responsabilidad única")


if __name__ == "__main__":
    main()

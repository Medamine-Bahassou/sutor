
import { LatexProvider } from '@/lib/LatexContext';
import Chat from '../chat/page';
import Pdf from '../pdf/page';

export default function DashPage() {

  return (
    <>
    <LatexProvider>

      <div className="grid grid-cols-4 p-4 gap-2  overflow-hidden h-full ">
        <div className="col-span-2 border rounded-2xl overflow-hidden ">
          <Pdf/>
        </div>
        <div className="col-span-2  border rounded-2xl h-full overflow-hidden">
          <Chat />
        </div>
      </div>
    </LatexProvider>
    </>
  )

}

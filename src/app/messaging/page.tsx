import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, User } from 'lucide-react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Team Messaging | ReliefLink',
//   description: 'Coordinate with your relief team.',
// };

const contacts = [
  { id: 1, name: 'Alpha Team', lastMessage: 'On our way to Sector 4.', avatar: 'team a', unread: 0, online: true },
  { id: 2, name: 'Logistics', lastMessage: 'Supply drop is confirmed for 1600h.', avatar: 'logistics team', unread: 2, online: true },
  { id: 3, name: 'Medical Unit', lastMessage: 'We need more saline packs.', avatar: 'medical staff', unread: 1, online: false },
  { id: 4, name: 'HQ Command', lastMessage: 'All teams, check in now.', avatar: 'command center', unread: 0, online: true },
  { id: 5, name: 'Jane Doe', lastMessage: 'Ready for my assignment.', avatar: 'volunteer person', unread: 0, online: true },
  { id: 6, name: 'Search & Rescue', lastMessage: 'Area cleared. Moving to next grid.', avatar: 'rescue worker', unread: 0, online: false },
];

const messages = [
  { id: 1, sender: 'Logistics', text: 'Supply drop is confirmed for 1600h at the main depot.', time: '14:30', self: false },
  { id: 2, sender: 'You', text: 'Copy that. Our team will be there to receive it. Do you have an inventory list?', time: '14:31', self: true },
  { id: 3, sender: 'Logistics', text: 'Yes. Sending it over now. It includes water, blankets, and first-aid kits.', time: '14:32', self: false },
  { id: 4, sender: 'Logistics', text: 'INVENTORY_LIST.pdf', time: '14:32', self: false },
  { id: 5, sender: 'You', text: 'Received. Thanks.', time: '14:35', self: true },
];

export default function MessagingPage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-1">
      <div className="w-1/3 max-w-sm border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight">Teams &amp; Contacts</h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                  contact.id === 2 ? 'bg-accent' : ''
                }`}
              >
                <Avatar className="relative h-10 w-10">
                  <AvatarImage src={`https://picsum.photos/seed/${contact.avatar}/100/100`} data-ai-hint={contact.avatar} />
                  <AvatarFallback><User size={20} /></AvatarFallback>
                  {contact.online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-accent"></div>}
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{contact.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {contact.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-4 border-b border-border p-4">
          <Avatar className="h-10 w-10">
             <AvatarImage src="https://picsum.photos/seed/logistics-team/100/100" data-ai-hint="team people" />
             <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Logistics</h2>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${message.self ? 'justify-end' : ''}`}
              >
                {!message.self && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://picsum.photos/seed/logistics-team/100/100" data-ai-hint="team people"/>
                     <AvatarFallback>L</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-md rounded-lg p-3 ${
                    message.self ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`mt-1 text-xs ${message.self ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.time}
                  </p>
                </div>
                 {message.self && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://picsum.photos/seed/user/100/100" data-ai-hint="person face" />
                     <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-border p-4">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12" />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

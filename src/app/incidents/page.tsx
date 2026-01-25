'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { FireIcon, FloodIcon } from '@/components/icons';
import { Siren, ShieldAlert, Ambulance, MapPin, Send } from 'lucide-react';
import type { Metadata } from 'next';

// This would typically be in a separate layout file, but for simplicity:
// export const metadata: Metadata = {
//   title: 'Report Incident | ReliefLink',
//   description: 'Submit a new incident report.',
// };

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  type: z.enum(['fire', 'flood', 'medical', 'structural', 'other']),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10, { message: 'Please provide a detailed description.' }),
  location: z.string().min(3, { message: 'Please specify a location.' }),
});

const incidentTypes = [
    { value: 'fire', label: 'Fire', icon: <FireIcon className="h-5 w-5" /> },
    { value: 'flood', label: 'Flood', icon: <FloodIcon className="h-5 w-5" /> },
    { value: 'medical', label: 'Medical Emergency', icon: <Ambulance className="h-5 w-5" /> },
    { value: 'structural', label: 'Structural Damage', icon: <Siren className="h-5 w-5" /> },
    { value: 'other', label: 'Other', icon: <ShieldAlert className="h-5 w-5" /> },
];

export default function IncidentsPage() {
  const mapPlaceholder = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would send the data to your backend
    alert('Incident reported successfully!');
    form.reset();
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Report an Incident</h1>
        <p className="text-muted-foreground">Provide details about the incident to dispatch help.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Warehouse Fire at 5th and Main" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Incident Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select incident type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  {incidentTypes.map(type => (
                                      <SelectItem key={type.value} value={type.value}>
                                          <div className="flex items-center gap-2">
                                              {type.icon}
                                              {type.label}
                                          </div>
                                      </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Urgency Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select urgency level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide as much detail as possible: number of people affected, specific hazards, etc."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="sr-only">Location Address</FormLabel>
                              <FormControl>
                                  <div className="relative">
                                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input placeholder="Enter address or coordinates" className="pl-9" {...field} />
                                  </div>
                              </FormControl>
                              <FormDescription>The map will update as you type.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      {mapPlaceholder && (
                          <div className="aspect-video w-full overflow-hidden rounded-md border">
                          <Image
                              src={mapPlaceholder.imageUrl}
                              alt={mapPlaceholder.description}
                              width={800}
                              height={600}
                              className="h-full w-full object-cover"
                              data-ai-hint={mapPlaceholder.imageHint}
                          />
                          </div>
                      )}
                    </CardContent>
                </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
